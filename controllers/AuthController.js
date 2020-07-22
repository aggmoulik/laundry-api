const User = require("../models/usersModel"),
    Response = require('../shared/Response'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    { JWT_SECRET_KEY, SALT_ROUNDS, FIFTEEN_MINUTES_IN_SECOND, THREE_MINUTES_IN_SECOND } = require('../shared/Constants');

function checkIfPasswordIsCorrect(founduser, password) {
    return bcrypt.compareSync(password, founduser.password);
}

function genAccessToken(user) {
    const userId = user._id;
    const role = user.role; // [ 'admin', 'user' ]
    const type = 'access';

    const tokenPayload = { type, userId, role };

    const accessToken = jwt.sign(
        tokenPayload,
        JWT_SECRET_KEY,
        { expiresIn: THREE_MINUTES_IN_SECOND }
    );
    return accessToken;
}

const hashHmacSha256 = (string) => crypto
    .createHmac('sha256', JWT_SECRET_KEY)
    .update(string)
    .digest('hex');

function genKey(id, password) {
    const rawKey = id + password;
    const key = hashHmacSha256(rawKey);
    return key;
}

function genRefreshToken(user) {
    const userId = user._id;
    const role = user.role;
    const type = 'refresh';
    const password = user.password;
    const key = genKey(userId, password);

    const tokenPayload = { type, userId, role, key };

    const refreshToken = jwt.sign(tokenPayload, JWT_SECRET_KEY);
    return refreshToken;
}

// Sign Up
module.exports.register = (req, res) => {
    var query = {
        $or: []
    };

    if (req.body.login_method === 'mobile') {
        query.$or.push({ mobile_no: req.body.mobile_no });
    } else {
        if (typeof req.body.email === "undefined" || req.body.email === null) {
            Response.error(res, 401, "Email Id not provided");
            return;
        }
        query.$or.push({ email: req.body.email });
    }

    // Google login
    // if (req.body.login_method === LoginMethods.GOOGLE) {
    //     query.$or.push({ google_id: req.body.social_id });
    // }

    // Facebook login
    // if (req.body.login_method === LoginMethods.FACEBOOK) {
    //     query.$or.push({ facebook_id: req.body.social_id });
    // }

    // Email login
    // if (req.body.login_method === LoginMethods.EMAIL) {
    //     query.$or.push({ email: req.body.email });
    // }

    // Mobile login
    // if (req.body.login_method === LoginMethods.MOBILE) {
    //     query.$or.push({ mobile_no: req.body.mobile_no });
    // }

    User.findOne(
        query,
        async (err, doc2) => {
            if (doc2) {
                delete doc2._doc.password;
                // User Exists
                Response.generalPayloadResponse(err, doc2, res, 404, "User Exists");
                return;
            } else {
                // No user found
                let user = new User(req.body);

                let login_method = req.body.login_method;

                if (login_method === 'mobile') delete user._doc.login_method;
                else user.login_method = login_method;

                if (user.password) user.password = bcrypt.hashSync(user.password, SALT_ROUNDS);

                if (!user.role) user.role = 'user';

                if (login_method === 'facebook') user.facebook_id = req.body.social_id;
                if (login_method === 'google') user.google_id = req.body.social_id;

                // Generate Token
                const access_token = genAccessToken(user);
                const refresh_token = genRefreshToken(user);

                user.access_token = access_token;
                user.refresh_token = refresh_token;

                // Add User in DB
                let result = await User.create(user);
                delete result._doc.password;
                Response.success(res, 200, "User Created Successfully", result)
            }
        }
    )
}

// Login
module.exports.login = (req, res) => {
    // DB query for User
    let query = {};

    if (req.body.login_method === 'mobile') {
        query.mobile_no = req.body.username;
    } else {
        if (typeof req.body.username === "undefined" || req.body.username === null) {
            Response.error(res, 401, "Username not provided");
            return;
        }
        query.email = req.body.username;
    }

    // if (req.body.login_method === LoginMethods.GOOGLE) { // Google login
    //     query.google_id = req.body.social_id;
    // } else if (req.body.login_method === LoginMethods.FACEBOOK) { // Facebook Login
    //     query.facebook_id = req.body.social_id;
    // } else if (req.body.login_method === LoginMethods.EMAIL) {
    //     // Email login
    //     query.email = req.body.username;
    // } else if (req.body.login_method === LoginMethods.MOBILE) {
    //     // Mobile login
    //     query.mobile_no = req.body.username;
    // } else {
    //     Response.generalResponse("Invalid Request", res, 404, "Invalid request");
    //     return;
    // }

    User.findOne(
        query,
        (err, result) => {
            if (result) {

                if (result.login_method !== req.body.login_method) {
                    Response.generalResponse(err, res, 404, "Invalid Login");
                    return;
                }

                // Set Last Login
                result.last_login = Date.now();

                // result.save((err, data))
                let doc = new User(result)

                const pw = doc.password;

                // user exists and social login
                if (['facebook', 'google', 'mobile'].includes(result.login_method.toLowerCase())) {
                    Response.generalPayloadResponse(err, doc, res);
                } else {
                    // User exists and check password
                    if (checkIfPasswordIsCorrect(doc, req.body.password)) {
                        // Generate Token
                        const access_token = genAccessToken(doc);
                        doc.access_token = access_token;
                        delete doc._doc.password;
                        doc.update(doc, (err, data) => {
                            Response.generalPayloadResponse(err, doc, res);
                        });
                    } else {
                        Response.generalResponse(err, res, 404, "Invalid Email or Password");
                    }
                }
            } else {
                // if (req.body.social_id) {
                // No user found with social id
                // Response.generalResponse(err, res, 404, "Invalid social login");
                // } else if (req.body.login_method === LoginMethods.EMAIL) {
                // No user found with email
                // Response.generalResponse(err, res, 404, "Invalid Email or Password");
                // } else {
                // No user found with mobile
                // Response.generalResponse(err, res, 404, "Invalid Mobile");
                Response.generalResponse(err, res, 404, "Invalid Login");
            }
        });
}

// Refresh Token
module.exports.refresh = async (req, res) => {

    const refresh_token = req.body.refresh_token;

    try {
        const tokenPayload = jwt.verify(refresh_token, JWT_SECRET_KEY);
        if (tokenPayload.type !== 'refresh') {
            throw new Error('UnAuthorized Token');
        }
        const user_id = tokenPayload.userId;
        const user = await User.findById(user_id);

        const password = user.password;
        const keyToCompare = genKey(user_id, password);

        if (keyToCompare !== tokenPayload.key) {
            throw new Error('UnAuthorized Login');
        }

        const access_token = genAccessToken(user);
        user.access_token = access_token;
        user.update(user, (err, data) => {
            delete user._doc.password;
            Response.generalPayloadResponse(err, user, res, 200, "Access Token");
        });
        // Response.success(res, 200, "Access Token", user)
    } catch (error) {
        Response.error(res, 401, error.message);
    }
}