const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/add', productController.productAddForm);
router.post('/products', productController.createProduct);
router.get('/product/:id', productController.getProductById);
router.get('/product/category/:categoryId/store/:storeId', productController.getProducts);

module.exports = router;