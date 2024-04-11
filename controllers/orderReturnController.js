const orderReturnService = require('../services/orderReturnService');
const { statusCodes, statusMessages } = require('../helper/httpStatus');

module.exports = {
  createOrderReturn: async (req, res) => {
    try {
      const orderReturn = await orderReturnService.createOrderReturn(req.body);
      res.status(statusCodes.CREATED).json({message:statusMessages.CREATED, data:orderReturn});
    } catch (error) {
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message:statusMessages.INTERNAL_SERVER_ERROR, error: error.message });
    }
  },

  getOrderReturnById: async (req, res) => {
    try {
      const orderReturn = await orderReturnService.getOrderReturnById(req.params.id);
      if (!orderReturn) {
        res.status(statusCodes.NOT_FOUND).json({ message: `Order return  ${statusMessages.NOT_FOUND}` });
      } else {
        res.status(statusCodes.OK).json({message:statusMessages.OK, data:orderReturn});
      }
    } catch (error) {
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message:statusMessages.INTERNAL_SERVER_ERROR, error: error.message });
    }
  }
};
