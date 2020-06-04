const { User } = require('../models');
const createError = require('../helpers/createError');
const { generateToken } = require('../helpers/jwt');
const { compare } = require('../helpers/bcrypt');

class UserController {
    static async register(req, res, next) {
        try {
            let { email, password, role } = req.body;
            let obj = { email, password, role };
            let person = await User.findOne({ where: { email } })
            if (person) {
                throw createError(400, 'Email has already been registered');
            } else {
                let created = await User.create(obj)
                res.status(201).json(created);
            }
        } catch (err) {
            next(err);
        }
    }
    static async login(req, res, next) {
        try {
            let { email, password } = req.body;
            let userHasRegistered = await User.findOne({ where: { email } })
            if (!userHasRegistered) {
                throw createError(400, 'Wrong email/password')
            } else {
                let checkPassword = await compare(password, userHasRegistered.password);
                if (!checkPassword) {
                    throw createError(400, 'Wrong email/password')
                } else {
                    let payload = { id: userHasRegistered.id };
                    let token = generateToken(payload);
                    res.status(200).json({ token });
                }
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = UserController;