const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

router.post('/store', storeController.createStore);
router.get('/store/:id', storeController.getStoreById);

module.exports = router;
