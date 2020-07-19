const express = require('express'),
  router = express.Router(),
  { authorizationMiddleware } = require('../controllers/Middleware');

/* GET home page. */
router.get('/', authorizationMiddleware ,function (req, res, next) {
  res.status(200).json({
    status: 'OK'
  });
});

module.exports = router;
