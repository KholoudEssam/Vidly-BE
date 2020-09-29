const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  phone: {
    type: Number,
    maxlength: 9,
  },
});

module.exports = mongoose.model('Customer', customerSchema);
