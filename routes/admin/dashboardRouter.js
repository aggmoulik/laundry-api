var express = require('express');
var router = express.Router();
var Slider = require('../../models/admin/dashModel');

router.get('/', async (req, res, next) => {
    let dashModel = await Slider.find();
    return res.status(200).json({ dashModel, message: true });
});

router.post('/', (req, res, next) => {
    let { image } = req.body;

    let sliderModel = new Slider({
        "image": image
    });

    sliderModel.save((error) => {
        if (error) return res.status(401).json({
            message: false,
        });
    });

    return res.status(200).json({ sliderModel, message: true });
});

router.delete('/', async (req, res, next) => {
    let status  = await offer.findByIdAndDelete(req.body._id);
    res.status(200).json({
        message: true,
        status: status
    })
})

module.exports = router;