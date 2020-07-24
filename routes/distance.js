const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/DistanceController');

router.get('/', (req, res) => {
    console.log("jksjksajka")
    controller.getPlan(req, res)
});

router.post('/', (req, res) => controller.addDeliveryPlan(req, res));

module.exports = router;