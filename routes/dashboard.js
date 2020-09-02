const express = require('express'),
    router = express.Router(),
    offers = require('../models/offerModel'),
    services = require('../models/serviceModel'),
    blogs = require('../models/blogModel'),
    orders = require('../models/orders'),
    categories = require('../models/categoryModel'),
    items = require('../models/productModel'),
    Response = require('../shared/Response');

router.get('/', async (req, res) => {
    let offer = await offers.find({ status: 1 });
    let service = await services.find({ status: 1 });
    let blog = await blogs.find({ status: 1 });
    let order = await orders.find();
    let category = await categories.find({status: 1});
    let products = await items.find({status: 1});

    Response.generalPayloadResponse(null, {
        offers: offer,
        services: service,
        blogs: blog,
        orders: order,
        category: category,
        products: products
    }, res, 200);
})

module.exports = router;