const OrderReturn = require('../models/orderReturn');

module.exports = {
  createOrderReturn: async (orderReturnData) => {
    return await OrderReturn.create(orderReturnData);
  },

  getOrderReturnById: async (orderReturnId) => {
    return await OrderReturn.findById(orderReturnId);
  }
};
