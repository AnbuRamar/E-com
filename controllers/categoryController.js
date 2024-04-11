const categoryService = require('../services/categoryService');
const { statusCodes, statusMessages } = require('../helper/httpStatus');

module.exports = {
  createCategory: async (req, res) => {
    try {
      const category = await categoryService.createCategory(req.body);
      res.status(statusCodes.CREATED).json({message:statusMessages.CREATED, data:category});
    } catch (error) {
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: statusMessages.INTERNAL_SERVER_ERROR, error: error.message });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const category = await categoryService.getCategoryById(req.params.id);
      if (!category) {
        res.status(statusCodes.NOT_FOUND).json({ message: `Category ${statusMessages.NOT_FOUND}` });
      } else {
        res.status(statusCodes.OK).json({message:statusMessages.OK, data:category});
      }
    } catch (error) {
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message:statusMessages.INTERNAL_SERVER_ERROR, error: error.message });
    }
  }
};
