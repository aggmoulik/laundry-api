var express = require('express');
var router = express.Router();
let jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'laundry';

function getAccessTokenFromHeader(request) {
  const authorizationHeader = request.headers.authorization;
  let token;
  if (authorizationHeader) {
    token = request.headers.authorization.split(' ')[1];
  }
  return token;
}

function authorizationMiddleware(request, response, nextHandler) {
  const accessToken = getAccessTokenFromHeader(request);

  try {
    const tokenPayload = jwt.verify(accessToken, JWT_SECRET_KEY);
    if (tokenPayload.type !== 'access') {
      throw new Error('wrong token type');
    }
    response.locals.user = tokenPayload;
    nextHandler();
  } catch (error) {
    let message = '';
    if (error.name === "TokenExpiredError") {
      message = 'TokenExpiredError';
    } else message = 'AUTH FAILED'
    response.status(401).json({
      message: message,
      status: 401
    });
  }
}

/* GET users listing. */
router.get('/', authorizationMiddleware, function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
