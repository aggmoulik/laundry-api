var express = require('express');
var router = express.Router();

let productRouter = require('./productRoute');
let serviceRouter = require('./servicesRoute');
var sliderRouter = require('./dashboardRouter');
var offerRouter = require('./offerRouter');
var blogRouter = require('./blogRouter');
let categoryRouter = require('./categoryRoute');

router.use('/blog', blogRouter);
router.use('/offer', offerRouter);
router.use('/services', serviceRouter);
router.use('/product', productRouter);
router.use('/category', categoryRouter)

module.exports = router;