const jwt = require('jsonwebtoken');
module.exports = {
    generateToken: (payload) => {
        return jwt.sign(payload, 'kucing');
    },
    verifyToken: (token) => {
        return jwt.verify(token, 'kucing');
    }
}