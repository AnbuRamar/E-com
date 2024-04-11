const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  size:{
    type: Number
  },
  price:{
    type: Number
  }
});

module.exports = mongoose.model('Product', productSchema);
