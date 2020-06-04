const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');
const createError = require('../helpers/createError');

authentication = async (req, res, next) => {
    let { token } = req.headers;
    try {
        let decoded = verifyToken(token);
        let userExist = await User.findOne({ where: { id: decoded.id } })
        if (!userExist) {
            throw createError(401, 'You Have to login first');
        } else {
            req.UserData = decoded;
            next();
        }
    } catch (err) {
        next(err);
    }
}

module.exports = authentication;