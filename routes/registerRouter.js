var express = require('express');
var router = express.Router();
var jwt = require('../controllers/jwtController');
let User = require('../models/usersModel');
var bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const LOGIN_TYPE = {
    'mobile': 'L01',
    'email': 'L02',
    'social': 'L03'
};

router.post('/',(req, res, next) => {
    let loginType = req.body.loginType;
    console.log(req.body);
    if (loginType === LOGIN_TYPE.email) {
        let { email, password, contact } = req.body;
        console.log("Hello");

        if ((typeof email === 'undefined' || typeof password === 'undefined' || typeof contact === 'undefined') &&
            (!email || !password || !contact)) {
            return res.status(401).json({ message: 'Enter Required Fields' });
        }

        console.log("Hello user");

        User.findOne({ "email": email }).exec().then( user => {
            console.log("Hello ttstst");
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Already Exists'
                });
            } else {
                // jwt token
                let token = jwt.sign(email);
                // hash of password for db
                let passHash = bcrypt.hashSync(password, SALT_ROUNDS);
                // location of user when login // longitude, latitude
                let location = { type: 'Point', coordinates: [75.8345539, 26.9031857] };
                // Update user model
                let user = new User({
                    name: "Moulik",
                    email: email,
                    image: "",
                    contact: contact,
                    password: passHash,
                    jwtToken: token,
                    location: location
                });

                user.save((error) => {
                    if (error) return res.status(401).json({
                        message: 'Auth Failed'
                    });
                    return res.status(200).json(user);
                });
            }
        }).catch((err) => {
            return res.status(401).json({
                error: err,
                message: 'Auth Failed'
            })
        });
    } else if (loginType === LOGIN_TYPE.mobile) {
        return res.status(401).json({
            message: 'Auth Failed'
        })
    }
});



module.exports = router;