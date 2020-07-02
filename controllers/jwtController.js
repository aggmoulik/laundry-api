const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'LaundrySECRET';
const JWT_EXPIRY_SECS = 300;
const JWT_ALGO = 'HS256'

var jwtController = {
    sign: (username) => {
        let token = jwt.sign({ username }, JWT_SECRET_KEY, {
            algorithm: JWT_ALGO,
            expiresIn: JWT_EXPIRY_SECS
        });
        return token;
    },
    verify: (jwtToken) => {
        return jwt.verify(jwtToken, JWT_SECRET_KEY);
    }
}

module.exports = jwtController;