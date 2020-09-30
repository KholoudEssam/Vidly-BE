const mongoose = require('mongoose');
const Joi = require('joi');

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
  },
});

function validateReq(data) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    phone: Joi.number(),
    isGold: Joi.bool(),
  });

  return schema.validate(data);
}
exports.customerSchema = customerSchema;
exports.Customer = mongoose.model('Customer', customerSchema);
exports.validateReq = validateReq;
