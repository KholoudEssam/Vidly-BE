const mongoose = require('mongoose');
const Joi = require('joi');

const { genreSchema } = require('./genre');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  numberInStock: {
    type: Number,
    min: 0,
    default: 0,
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
    default: 0,
  },
  genre: genreSchema,
});
function validateReq(data) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(255).required(),
    numberInStock: Joi.number().min(0),
    dailyRentalRate: Joi.number().min(0),
    genreId: Joi.objectId().required(),
  });
  return schema.validate(data);
}
exports.movieSchema = movieSchema;
module.exports.Movie = mongoose.model('Movie', movieSchema);
module.exports.validateReq = validateReq;
