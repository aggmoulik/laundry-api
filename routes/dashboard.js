const express = require('express'),
    router = express.Router(),
    offers = require('../models/offerModel'),
    services = require('../models/serviceModel'),
    blogs = require('../models/blogModel'),
    orders = require('../models/orders'),
    Response = require('../shared/Response');

router.get('/', async (req, res) => {
    let offer = await offers.find({ status: 1 });
    let service = await services.find({ status: 1 });
    let blog = await blogs.find({ status: 1 });
    let order = await orders.find({ status: 1 });

    Response.generalPayloadResponse(null, {
        offers: offer,
        services: service,
        blogs: blog,
        orders: order
    }, res, 200);
})

module.exports = router;