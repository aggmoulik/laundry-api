const User = require('../models/usersModel'),
    Response = require('../shared/Response'),
    CRUD = require('../shared/CRUD'),
    shortId = require('shortid'),
    Offer = require('../models/offerModel');

async function validate(req, res) {
    const { id, code } = req.body;

    // Valid Referral Code
    if (!shortId.isValid(id)) Response.error(res, 401, "Invalid Referral Code");

    // Validate user referral code
    let user_referred_by;
    User.find({ referral_code: code }, (err, doc) => {
        if (doc) {
            user_referred_by = doc;
        } else {
            Response.generalResponse(err, res, 401, "Invalid Referral Code");
            return;
        }
    });

    // validate user referred to
    let user_referred;
    User.findById(id, (err, doc) => {
        if (doc) {
            user_referred = doc;
        } else {
            Response.generalResponse(err, res, 404, "User dosen't exist");
            return;
        }
    });

    // If user already used referral code
    if (user_referred.referral_used) {
        Response.error(res, 401, "Already Used Referral");
        return;
    }

    // Update user reffered by
    User.findByIdAndUpdate(user_referred_by._id,
        { referral_count: user_referred_by.referral_count + 1 },
        (err, doc) => {
            if (err) Response.generalResponse(err, res);
        });

    // Update user referred
    User.findByIdAndUpdate(id,
        {
            referred_by: user_referred_by._id,
            referral_used: true
        },
        (err, doc) => {
            if (err) Response.generalResponse(err, res);
        }
    );
} 