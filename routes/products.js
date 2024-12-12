const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
} = require('../controllers/productController');
const tokenMiddleware = require('../middleware/token.middleware');

router.get('/', getAllProducts);
router.get('/:id', getProductById);

router.post('/', tokenMiddleware, upload.single('productImage'), createProduct);
router.put('/:id', tokenMiddleware, upload.single('productImage'), updateProductById);
router.delete('/:id', tokenMiddleware, deleteProductById);

module.exports = router;