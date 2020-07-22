const express = require('express'),
    router = express.Router(),
    CRUD = require('../shared/CRUD'),
    Model = require('../shared/TYPES').USER;

router.post('/:id', (req, res) => CRUD.updateById(req.params.id, req.body, Model, res));

router.get('/', (req, res) => CRUD.getAll(req, Model, res));

module.exports = router;