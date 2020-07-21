const express = require('express'),
    router = express.Router(),
    CRUD = require('../shared/CRUD'),
    Model = require('../shared/TYPES').USER;

router.post('/:id', (req, res) => CRUD.updateById(req.params.id, req.body, Model, res));

module.exports = router;