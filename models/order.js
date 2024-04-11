const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId:{
    type:Number,
    require: true,
    unique: true
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
  quantity: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Order', orderSchema);
