const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String
  },
  pincode: {
    type: Number
  }
});

module.exports = mongoose.model('Store', storeSchema);
