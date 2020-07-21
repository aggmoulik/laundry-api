var express = require('express');
var router = express.Router();
let Model = require('../../shared/TYPES').SERVICE;
let CRUD = require('../../shared/CRUD');

// Get All
router.get('/', (req, res) => CRUD.getAll(req, Model, res));

// Get By Id
router.get('/:id', (req, res) => CRUD.getById(req.params.id, Model, res));

// Add a Product
router.post('/', (req, res) => CRUD.create(req.body, Model, res));

// Update By Id
router.post('/:id', (req, res) => CRUD.updateById(req.params.id, req.body, Model, res));

module.exports = router;