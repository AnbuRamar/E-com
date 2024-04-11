const Category = require('../models/category');

module.exports = {
  createCategory: async (categoryData) => {
    return await Category.create(categoryData);
  },

  getCategoryById: async (categoryId) => {
    return await Category.findById(categoryId);
  },

  findAll: async () => {
    return await Category.find();
  }
};
