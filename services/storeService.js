const Store = require('../models/store');

module.exports = {
  createStore: async (storeData) => {
    return await Store.create(storeData);
  },

  getStoreById: async (storeId) => {
    return await Store.findById(storeId);
  }
};
