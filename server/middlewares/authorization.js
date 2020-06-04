const { Product, User } = require('../models');
const createError = require('../helpers/createError');

authorization = async (req, res, next) => {
    try {
        let userId = Number(req.UserData.id);
        let user = await User.findOne({ where: { id: userId } });
        if (!user || user.role !== 'Admin') {
            throw createError(403, 'You are forbidden to do that');
        }
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = authorization;