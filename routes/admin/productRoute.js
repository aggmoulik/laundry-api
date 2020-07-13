var express = require('express');
var router = express.Router();
var Product = require('../../models/admin/productModel');

router.get('/', async (req, res, next) => {
    let productModel = {};
    try {
        productModel = await Product.find();
    } catch (error) {
        return res.status(401).json({
            status: 401,
            error: error.message
        });
    }
    return res.status(200).json({ productModel, message: true });
});

router.get('/:id', async (req, res, next) => {
    let productId = req.params.id;
    let productModel = {};

    try {
        if (typeof productId !== "undefined") {
            productModel = await Product.findById(productId);
        } else {
            throw new Error("Product ID not defined")
        }
    } catch (error) {
        return res.status(401).json({
            status: 401,
            error: error.message
        });
    }
    return res.status(200).json({ productModel, message: true });
});

router.post('/', async (req, res, next) => {
    let { product } = req.body;
    productModel = new Product(product);
    productModel.save((error) => {
        if (error) return res.status(401).json({
            message: false,
        });
    });
    return res.status(200).json({ productModel, message: true });
})

router.post('/:id', async (req, res, next) => {

    let productId = req.params.id;
    let productModel = {};
    try {
        if (typeof productId !== "undefined") {
            let product = req.body.product;
            productModel = await Product.findByIdAndUpdate(productId, product);
        } else {
            throw new Error("Product ID not defined")
        }
    } catch (error) {
        return res.status(401).json({
            status: 401,
            error: error.message
        });
    }
    return res.status(200).json({ productModel, message: true });
});

router.delete('/:id', async (req, res, next) => {
    let productId = req.params.id;
    let status = '';
    try {
        status = await offer.findByIdAndDelete(productId);
    } catch (error) {
        return res.status(401).json({
            status: 401,
            error: error.message
        });
    }
    res.status(200).json({
        message: true,
        status: status
    })
})

module.exports = router;