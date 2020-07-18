var express = require('express'),
    router = express.Router(),
    { login, register, refresh } = require('../controllers/AuthController');

router.post('/login', (req, res) => login(req, res));

router.post('/refreshToken', (req, res) => register(req, res));

router.post('/register', (req, res) => refresh(req, res));

module.exports = router;