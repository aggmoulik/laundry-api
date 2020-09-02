const express = require('express'),
    router = express.Router(),
    CRUD = require('../shared/CRUD'),
    Model = require('../shared/TYPES').USER,
    userController = require('../controllers/UserController');

router.post('/:id', (req, res) => CRUD.updateById(req.params.id, req.body, Model, res));

router.get('/', (req, res) => CRUD.getAll(req, Model, res));

// Notification id
router.post('/notification_id', userController.notificationID);

module.exports = router;