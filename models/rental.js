const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const { customerSchema } = require('./customer');
const { date } = require('joi');

const rentalSchema = new mongoose.Schema({
  customer: customerSchema,
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
      },
      dailyRentalRate: {
        type: Number,
        min: 0,
        default: 0,
      },
    }),
    required: true,
  },
  dateOute: {
    type: Date,
    default: Date.now(),
  },
  dateReturned: Date,
  rentalFee: {
    type: Number,
    min: 0,
  },
});

function validateReq(data) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });
  return schema.validate(data);
}

module.exports.Rental = mongoose.model('Rental', rentalSchema);
module.exports.validateReq = validateReq;
