const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

const orderService = require('../services/orderService');
const { statusCodes, statusMessages } = require('../helper/httpStatus');

module.exports = {
  placeOrder: async (req, res) => {
    try {
      const order = await orderService.placeOrder(req.body);
      res.status(statusCodes.OK).json({message:statusMessages.CREATED, data:order});
    } catch (error) {
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message:statusMessages.INTERNAL_SERVER_ERROR, error: error.message });
    }
  },

  getOrdersByStoreId: async (req, res) => {
    try {
      const orders = await orderService.getOrdersByStoreId(req.params.storeId);
      const templatePath = path.join(__dirname, '../template/orderTemplate.ejs');
      const template = fs.readFileSync(templatePath, 'utf8');
      const renderedData = ejs.render(template, {orders});
      res.send(renderedData);
    } catch (error) {
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message:statusMessages.INTERNAL_SERVER_ERROR, error: error.message });
    }
  },

  generateOrderPDF: async (req, res) => {
    try {
      const pdfPath = await orderService.generateOrderPDF(req.params.orderId);
      res.status(statusCodes.CREATED).json({message:statusMessages.CREATED, data:`${process.env.BASE_URL || 'http://localhost:3000'}/pdf/file/${pdfPath}`});
    } catch (error) {
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: statusMessages.INTERNAL_SERVER_ERROR, error: error.message });
    }
  }
};
