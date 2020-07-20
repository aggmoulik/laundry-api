const express = require('express'),
    router = express.Router(),
    CRUD = require('../../shared/CRUD'),
    TYPES = require('../../shared/TYPES');

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
router.use('/category', categoryRouter);

// All delete route
router.delete('/delete/:type/:id', (req, res) => CRUD.statusChangeById(req.params.id, TYPES[req.params.type.toUpperCase()], res));

module.exports = router;