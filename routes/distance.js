const express = require('express'),
    router = express.Router(),
    CRUD = require('../shared/CRUD'),
    Model = require('../shared/TYPES').DISTANCE,
    controller = require('../controllers/DistanceController');

router.get('/', (req, res) => CRUD.getAll(req, Model, res));

router.get('/plan', (req, res) => controller.getPlan(req, res));

router.post('/', (req, res) => controller.addDeliveryPlan(req, res));

module.exports = router;