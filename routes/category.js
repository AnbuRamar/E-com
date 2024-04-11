const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/category', categoryController.createCategory);
router.get('/category/:id', categoryController.getCategoryById);

module.exports = router;
