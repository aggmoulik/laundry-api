var express = require('express');
var router = express.Router();
var jwt = require('../controllers/jwtController');
let User = require('../models/usersModel');
let bcrypt = require('bcrypt');

const SOCIAL_TYPE = {
    'google': 'S01',
    'facebook': 'S02'
};

function verifyJwtToken(req, res, next) {
    let jwtToken = req.body.token;
    try {
        let tokenPayload = jwt.verify(jwtToken);
        next();
    } catch (error) {
        // to think what should we really want in jwt expireation
        res.status(401).json({
            message: 'Auth Failed'
        });
    }
}

router.post('/', async (req, res, next) => {
    let { email, password } = req.body;
    let { name } = req.query;
    console.log(name);
    let user = await User.find({ "email": email }).exec();
    if (user.length < 1) {
        return res.status(401).json({
            message: 'User Dosen\'t exists'
        });
    }
    let result = bcrypt.compareSync(password, user[0].password);
    if (result) {
        return res.status(200).json({
            message: 'Auth Successfull',
            name: name
        });
    } else {
        return res.status(401).json({
            message: "Auth Failed 2"
        })
    }
});

router.post('/social', (req, res, next) => {
    let socialLogin = req.body.socialLogin && req.body.socialLogin;
    let username = req.body.username && req.body.username;
    let user = { "username": username };
    if (socialLogin === SOCIAL_TYPE.google) {
        user['token'] = jwt.sign(username);
    } else if (socialLogin === SOCIAL_TYPE.facebook) {
        user['token'] = jwt.sign(username);
    }

    //update DB
    res.status(200).json(user);
});

module.exports = router;