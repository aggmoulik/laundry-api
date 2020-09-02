const express = require('express');
const router = express.Router();
const MODEL = require('../shared/Types').NOTIFICATION // Model type

// CRUD Service
const CRUD = require('../shared/CRUD')

// Create
router.post('/', (req, res) => CRUD.create(req.body, MODEL, res));

// Update
router.put('/:id', (req, res) => CRUD.updateById(req.params.id, req.body, MODEL, res));

// Get by id
router.get('/:id', (req, res) => CRUD.getById(req.params.id, MODEL, res));

// Get all by user
router.get('/', (req, res) => CRUD.getByQueryPaginate({ user: req.userData.id }, (parseInt(req.query.limit) || 10), { time: '-1' }, (parseInt(req.query.page) || 0), MODEL, res));

module.exports = router;