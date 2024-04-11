const Product = require('../models/product');
const Order = require('../models/order');
const OrderReturn = require('../models/orderReturn');

module.exports = {
  createProduct: async (productData) => {
    const { name, category, size, price } = productData;
    return await Product.create({ name, category, size, price });
  },

  getProductById: async (productId) => {
    return await Product.findById(productId);
  },

  getProducts: async (categoryId, storeId) => {
    const products = await Product.find({ category: categoryId }).populate('category');
    const productDetails = await Promise.all(products.map(async (product) => {
      const orders = await Order.find({ product: product._id, store: storeId });
      const returns = await OrderReturn.find({ product: product._id, store: storeId });
      const totalOrders = orders.reduce((sum, order) => sum + order.quantity, 0);
      const totalReturns = returns.reduce((sum, ret) => sum + ret.returnQuantity, 0);
      const orderedPercentage = totalOrders !== 0 ? (totalOrders / 100) * 100 : 0;
      const returnedPercentage = totalOrders !== 0 ? (totalReturns / totalOrders) * 100 : 0;
      console.log("1", orders ,"2", returns, "3" ,totalOrders,"4", totalReturns, orderedPercentage, returnedPercentage);
      return {
        ...product.toObject(),
        orderedPercentage: isNaN(orderedPercentage) ? 0 : orderedPercentage.toFixed(2),
        returnedPercentage: isNaN(returnedPercentage) ? 0 : returnedPercentage.toFixed(2)
      };
    }));
    return productDetails;
  }
};
