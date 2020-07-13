var express = require('express');
var router = express.Router();
var Services = require('../../models/admin/subCategoryModel');

router.get('/', async (req, res, next) => {
    let serviceModel = {};
    try {
        serviceModel = await Services.find();
    } catch (err) {
        return res.status(401).json({
            message: false,
            error: err
        });
    }
    return res.status(200).json({
        serviceModel
    });
});

router.get('/:id', async (req, res, next) => {
    let serviceId = req.params.id ? req.params.id : "";
    let serviceModel = {};

    try {
        if (typeof serviceId !== "undefined") {
            serviceModel = await Services.findById(serviceId);
        } else {
            throw new Error("Not Found");
        }
    } catch (error) {
        return res.status(401).json({
            status: 401,
            error: error.message
        });
    }
    return res.status(200).json({ serviceModel, message: true });
});

router.post('/:id', async (req, res, next) => {
    let serviceId = req.params.id;
    let serviceModel = {};
    try {
        let service = req.body.subcat;
        serviceModel = await Services.findByIdAndUpdate(serviceId, service);
    } catch (error) {
        return res.status(401).json({
            status: 401,
            error: error.message
        });
    }
    return res.status(200).json({ serviceModel, message: true });
})

router.post('/', async (req, res, next) => {

    let serviceModel = {};
    try {
        let { subcat } = req.body;
        serviceModel = new Services(subcat);
        serviceModel.save((error) => {
            if (error) throw new Error("Not Added");
        });
    } catch (error) {
        return res.status(401).json({
            status: 401,
            error: error.message
        });
    }
    return res.status(200).json({ serviceModel, message: true });
});

router.delete('/:id', async (req, res, next) => {
    let serviceId = req.params.id;
    let status = await offer.findByIdAndDelete(serviceId);
    res.status(200).json({
        message: true,
        status: status
    })
})

module.exports = router;