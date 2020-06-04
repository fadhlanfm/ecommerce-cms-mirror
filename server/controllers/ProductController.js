const { Product } = require('../models');
const createError = require('../helpers/createError');

class ProductController {
    static async create(req, res, next) {
        try {
            let { name, image_url, price, stock } = req.body;
            let obj = { name, image_url, price, stock };
            let newProduct = await Product.create(obj);
            res.status(201).json(newProduct);
        } catch (err) {
            next(err);
        }
    }
    static async showAll(req, res, next) {
        try {
            let products = await Product.findAll();
            res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    }
    static async editData(req, res, next) {
        try {
            let id = Number(req.params.id);
            let findData = await Product.findOne({ where: { id } });
            if (!findData) {
                throw createError(404, 'Error Not Found');
            }
            let { name, image_url, price, stock } = req.body;
            let obj = { name, image_url, price, stock };
            let updatedData = await Product.update(obj, { where: { id } });
            if (!updatedData) {
                throw createError(404, 'Error Not Found');
            } else {
                res.status(200).json(obj);
            }
        } catch (err) {
            next(err);
        }
    }
    static async deleteData(req, res, next) {
        try {
            let id = Number(req.params.id);
            let findData = await Product.findOne({ where: { id } });
            if (!findData) {
                throw createError(404, 'Error Not Found');
            }
            await Product.destroy({ where: { id } });
            res.status(200).json({
                msg: 'Your data has been deleted'
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ProductController;