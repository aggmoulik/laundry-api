var express = require('express');
var router = express.Router();
var offer = require('../../models/admin/offerModel');

function validate(req, res, next) {
    let { offerName, discount, code, image } = req.body;

    if (!offerName || typeof offerName === "undefined") {
        return res.status(401).json({
            message: "Enter the Offer Name"
        });
    };

    if (!discount || typeof discount === "undefined") {
        return res.status(401).json({
            message: "Enter the Discount"
        });
    };

    if (!code || typeof code === "undefined") {
        return res.status(401).json({
            message: "Enter the Offer Code"
        });
    };

    if (!image || typeof image === "undefined") {
        return res.status(401).json({
            message: "Enter the Image URL"
        });
    };

    next();
}

router.get('/', async (req, res, next) => {
    let offerModel = await offer.find();
    return res.status(200).json({ offerModel, message: true });
});

router.post('/', validate, (req, res, next) => {
    let { offerName, discount, code, image } = req.body;

    let offerModel = new offer({
        "offerName": offerName,
        "discount": discount,
        "code": code,
        "image": image
    });

    offerModel.save((error) => {
        if (error) return res.status(401).json({
            message: false,
        });
    });

    return res.status(200).json({ offerModel, message: true });
});

router.delete('/', async (req, res, next) => {
    let status  = await offer.findByIdAndDelete(req.body._id);
    res.status(200).json({
        message: true,
        status: status
    })
})

module.exports = router;