const mongoose = require('mongoose');

const orderReturnSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  returnQuantity: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('OrderReturn', orderReturnSchema);
