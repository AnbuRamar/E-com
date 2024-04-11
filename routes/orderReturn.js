const express = require('express');
const router = express.Router();
const orderReturnController = require('../controllers/orderReturnController');

router.post('/orderReturn', orderReturnController.createOrderReturn);
router.get('/orderReturn/:id', orderReturnController.getOrderReturnById);

module.exports = router;