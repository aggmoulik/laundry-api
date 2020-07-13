var express = require('express');
const User = require('../models/usersModel');
var router = express.Router();
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let crypto = require('crypto');
const JWT_SECRET_KEY = 'laundry';
const LOGIN_TYPE = {
    'email': 'L01',
    'mobile': 'L02',
    'google': 'S01',
    'facebook': 'S02'
};

const hashHmacSha256 = (string) => crypto
    .createHmac('sha256', JWT_SECRET_KEY)
    .update(string)
    .digest('hex');

function checkIfPasswordIsCorrect(founduser, password) {
    return bcrypt.compareSync(password, founduser.password);
}

const FIFTEEN_MINUTES_IN_SECOND = 15 * 60;

function genAccessToken(user) {
    const userId = user._id;
    const role = user.role; // [ 'admin', 'user' ]
    const type = 'access';

    const tokenPayload = { type, userId, role };

    const accessToken = jwt.sign(
        tokenPayload,
        JWT_SECRET_KEY,
        { expiresIn: FIFTEEN_MINUTES_IN_SECOND }
    );
    return accessToken;
}

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

function getAccessTokenFromHeader(request) {
    const authorizationHeader = request.headers.authorization;
    let token;
    if (authorizationHeader) {
        token = request.headers.authorization.split(' ')[1];
    }
    return token;
}

function authorizationMiddleware(request, response, nextHandler) {
    const accessToken = getAccessTokenFromHeader(request);

    try {
        const tokenPayload = jwt.verify(accessToken, JWT_SECRET_KEY);
        if (tokenPayload.type !== 'access') {
            throw new Error('Unauthorized Token');
        }
        response.locals.user = tokenPayload;
        nextHandler();
    } catch (error) {
        response.status(401).json({
            status: 401,
            message: error.message
        });
    }
}


router.post('/login', async (req, res) => {
    let { email, password } = req.body;
    let foundUser = await User.find({ "email": email }).exec();

    if (foundUser.length < 1) {
        res.status(401).json({
            status: 401,
            message: 'Authentication Failed'
        });
        return;
    }

    const isPasswordCorrect = checkIfPasswordIsCorrect(foundUser[0], password);
    if (!isPasswordCorrect) {
        res.status(401).json({
            status: 401,
            message: 'Authentication Failed'
        });
        return;
    }

    const accessToken = genAccessToken(foundUser[0]);
    const refreshToken = genRefreshToken(foundUser[0]);
    res.status(200).json({ accessToken, refreshToken });
});

router.post('/refreshToken', async (request, response) => {
    const refreshToken = request.body.refreshToken;

    try {
        const tokenPayload = jwt.verify(refreshToken, JWT_SECRET_KEY);
        if (tokenPayload.type !== 'refresh') {
            throw new Error('UnAuthorized Token');
        }
        const userId = tokenPayload.userId;
        const userInDb = await User.findById(userId);
        const password = userInDb.password;

        const keyToCompare = genKey(userId, password);
        if (keyToCompare !== tokenPayload.key) {
            throw new Error('UnAuthorized Login');
        }

        const newAccessToken = genAccessToken(userInDb);
        response.status(200).json({ "accesstoken": newAccessToken });
    } catch (error) {
        response.status(401).send(error.message);
    }
});

router.get('/', authorizationMiddleware, (req, res) => {
    res.status(200).json({
        message: 'Hello'
    });
});

module.exports = router;