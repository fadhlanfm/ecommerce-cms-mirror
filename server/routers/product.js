const router = require('express').Router();
const ProductController = require('../controllers/ProductController');

router.post('/', ProductController.create);
router.get('/', ProductController.showAll);
router.put('/:id', ProductController.editData);
router.delete('/:id', ProductController.deleteData);

module.exports = router;