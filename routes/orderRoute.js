const express = require('express'),
    router = express.Router(),
    CRUD = require('../shared/CRUD'),
    Model = require('../shared/TYPES').ORDER;

router.post('/', (req, res) => CRUD.create(req.body, Model, res));

router.get('/', (req, res) => CRUD.getAll(req, Model, res));

module.exports = router;