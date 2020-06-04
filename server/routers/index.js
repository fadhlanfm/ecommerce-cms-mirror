const router = require('express').Router();
const user = require('./user');
const product = require('./product');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.use('/users', user);
router.use(authentication, authorization);
router.use('/products', product);

module.exports = router;