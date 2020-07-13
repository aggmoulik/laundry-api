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

router.get('/:id', async (req, res, next) => {
    let offerId = req.params.id;
    let offerModel = {};

    if (typeof offerId !== "undefined") {
        offerModel = await offer.findById(offerId);
    } else {
        offerModel = await offer.find();
    }
    return res.status(200).json({ offerModel, message: true });
});

router.post('/:id', async (req, res, next) => {

    let offerId = req.params.id;
    let offerModel = {};

    if (typeof offerId !== "undefined") {
        offerModel = await offer.findByIdAndUpdate(id);
    } else {


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
    }

    return res.status(200).json({ offerModel, message: true });
});

router.delete('/:id', async (req, res, next) => {
    let offerId = req.params.id;
    let status = await offer.findByIdAndDelete(offerId);
    res.status(200).json({
        message: true,
        status: status
    })
})

module.exports = router;