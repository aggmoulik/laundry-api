const express = require('express'),
    router = express.Router(),
    CRUD = require('../../shared/CRUD'),
    Model = require('../../shared/TYPES').BLOG;

router.get('/', (req, res) => CRUD.getAll(req, Model, res));

router.post('/', (req, res) => CRUD.create(req.body, Model, res));

router.post('/:id', (req, res) => CRUD.updateById(req.params.id, req.body, Model, res));

module.exports = router;