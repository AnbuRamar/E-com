const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/order', orderController.placeOrder);
router.get('/order/:storeId', orderController.getOrdersByStoreId);
router.get('/order/pdf/:orderId', orderController.generateOrderPDF);

module.exports = router;
