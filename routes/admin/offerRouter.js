const express = require('express'),
    router = express.Router(),
    CRUD = require('../../shared/CRUD'),
    Model = require('../../shared/TYPES').OFFER,
    controller = require('../../controllers/OfferController');

router.get('/', (req, res) => CRUD.getAll(req, Model, res));

router.get('/:id', (req, res) => CRUD.getById(req.params.id, Model, res));

router.post('/', (req, res) => controller.addOffer(req, res));

router.post('/:id', (req, res) => CRUD.updateById(req.params.id, req.body, Model, res));

module.exports = router;