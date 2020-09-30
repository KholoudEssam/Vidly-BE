const express = require('express');

const { Rental, validateReq } = require('./../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');

const rentalRouter = express.Router();

rentalRouter.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

rentalRouter.post('/', async (req, res) => {
  try {
    const { error } = validateReq(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findById(req.body.movieId);
    if (!movie)
      return res.status(404).send(`${req.params.id} Movie is not found`);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer)
      return res.status(404).send(`${req.params.id} Customer is not found`);

    if (movie.numberInStock == 0)
      return res.status(400).send('Movie is not in Stock');

    let rental = new Rental({
      customer: customer,
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });
    rental = await rental.save();
    res.send(rental);
  } catch (err) {
    return res.status(404).send(`${err.value} is invalid id`);
  }
});

module.exports = rentalRouter;
