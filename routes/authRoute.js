var express = require('express'),
    router = express.Router(),
    { login, register, refresh } = require('../controllers/AuthController');

router.post('/login', (req, res) => login(req, res));

router.post('/refreshToken', (req, res) => refresh(req, res));

router.post('/register', (req, res) => register(req, res));

module.exports = router;