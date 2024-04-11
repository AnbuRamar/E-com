const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const productService = require('../services/productService');
const categoryService = require('../services/categoryService');
const { statusCodes, statusMessages } = require('../helper/httpStatus');

module.exports = {
  createProduct: async (req, res) => {
    try {
      console.log("res", req.body);
      const product = await productService.createProduct(req.body);
      res.status(statusCodes.CREATED).json({message:statusMessages.CREATED, data: product});
    } catch (error) {
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message:statusMessages.INTERNAL_SERVER_ERROR, error: error.message });
    }
  },

  productAddForm: async (req, res) => {
    try {
      const categories = await categoryService.findAll();
      const templatePath = path.join(__dirname, '../template/productAddTemplete.ejs');
      const template = fs.readFileSync(templatePath, 'utf8');
      const renderedData = ejs.render(template, { categories });
      res.send(renderedData);
    } catch (error) {
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message:statusMessages.INTERNAL_SERVER_ERROR, error: error.message });
    }
  },

  getProducts: async (req, res) => {
    try {
      const product = await productService.getProducts(req.params.categoryId, req.params.storeId);
      res.status(statusCodes.OK).json({message:statusMessages.OK, data: product});
    } catch (error) {
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message:statusMessages.INTERNAL_SERVER_ERROR, error: error.message });
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product) {
        res.status(statusCodes.NOT_FOUND).json({ message: `Product ${statusMessages.NOT_FOUND}` });
      } else {
        res.status(statusCodes.OK).json({message:statusMessages.OK, data: product});
      }
    } catch (error) {
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message:statusMessages.INTERNAL_SERVER_ERROR, error: error.message });
    }
  }
};
