const Order = require('../models/order');
const path = require('path'); 

const PDFDocument = require('pdfkit');
const fs = require('fs');

module.exports = {
  placeOrder: async (orderData) => {
    const latestOrder = await Order.findOne().sort({ orderId: -1 }).limit(1);
    let newOrderId;
    if (latestOrder && !isNaN(latestOrder.orderId)) {
      newOrderId = Math.max(latestOrder.orderId + 1, 12000);
    } else {
      newOrderId = 12000;
    }
    orderData.orderId = newOrderId;
    const order = await Order.create(orderData);
    return order;
  },

  getOrdersByStoreId: async (storeId) => {   
    const orders = await Order.find({ store: storeId }).populate({
      path: 'product',
      populate: {
        path: 'category',
        model: 'Category'
      }
    });

    const ordersByCategory = {};
    orders.forEach(order => {
      const categoryName = order.product.category.name;
      if (!ordersByCategory[categoryName]) {
        ordersByCategory[categoryName] = [];
      }
      ordersByCategory[categoryName].push(order);
    });

    const result = Object.keys(ordersByCategory).map(category => ({
      category: category,
      orders: ordersByCategory[category]
    }));
      return result
  },

  generateOrderPDF: async (orderId) => {
    const order = await Order.findById(orderId).populate('product store');
    if (!order) {
      throw new Error('Order not found');
    }
    function generateRandomNumber() {
      return Math.floor(100000 + Math.random() * 900000); 
    }
  
    const randomNumber = generateRandomNumber();
    const fileName = `order_${orderId}-${randomNumber}.pdf`;
    const pdfPath = path.join(__dirname, '../files', fileName);
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));

    doc.fontSize(20).text('Order Details', { align: 'center' }).moveDown();
    doc.fontSize(14).text(`Order ID: ${order._id}`);
    doc.fontSize(14).text(`Product: ${order.product.name}`);
    doc.fontSize(14).text(`Store: ${order.store.name}`);
    doc.fontSize(14).text(`Quantity: ${order.quantity}`);
    doc.end();

    return fileName;
  }
};
