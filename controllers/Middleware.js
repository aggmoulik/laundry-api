const jwt = require('jsonwebtoken'),
    Response = require('../shared/Response'),
    { JWT_SECRET_KEY } = require('../shared/Constants');

function getAccessTokenFromHeader(request) {
    const authorizationHeader = request.headers.authorization;
    let token;
    if (authorizationHeader) {
        token = request.headers.authorization.split(' ')[1];
    }
    return token;
}

module.exports.authorizationMiddleware = (request, response, nextHandler) => {
    const accessToken = getAccessTokenFromHeader(request);

    try {
        const tokenPayload = jwt.verify(accessToken, JWT_SECRET_KEY);
        if (tokenPayload.type !== 'access') {
            throw new Error('Unauthorized Token');
        }
        response.locals.user = tokenPayload;
        nextHandler();
    } catch (error) {
        if (error.name === "TokenExpiredError") Response.error(response, 401, error.name);
        Response.error(response, 401, error.message)
    }
}