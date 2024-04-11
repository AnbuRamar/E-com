const storeService = require('../services/storeService');
const { statusCodes, statusMessages } = require('../helper/httpStatus');

module.exports = {
  createStore: async (req, res) => {
    try {
      const store = await storeService.createStore(req.body);
      res.status(statusCodes.CREATED).json({message:statusMessages.CREATED, data: store});
    } catch (error) {
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message:statusMessages.INTERNAL_SERVER_ERROR, error: error.message });
    }
  },

  getStoreById: async (req, res) => {
    try {
      const store = await storeService.getStoreById(req.params.id);
      if (!store) {
        res.status(statusCodes.NOT_FOUND).json({ message: `Product ${statusMessages.NOT_FOUND}` });
      } else {
        res.status(statusCodes.OK).json({message:statusMessages.OK, data: store});
      }
    } catch (error) {
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message:statusMessages.INTERNAL_SERVER_ERROR, error: error.message });
    }
  }
};
