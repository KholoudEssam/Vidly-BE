const express = require('express');
const { Genre } = require('../models/genre');

const { Movie, validateReq } = require('./../models/movie');

const movieRouter = express.Router();

movieRouter.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

movieRouter.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send(`${req.params.id} is not found`);

    res.send(movie);
  } catch (err) {
    return res.status(404).send(`${err.value} is invalid id`);
  }
});

movieRouter.post('/', async (req, res) => {
  const { error } = validateReq(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(404).send(error.details[0].message);

  let movie = new Movie({
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    genre: genre,
  });
  movie = await movie.save();
  res.send(movie);
});

movieRouter.put('/:id', async (req, res) => {
  try {
    let movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send(`${req.params.id} is not found`);

    let genre;
    // if user entered new genre
    if (req.body.genreId != movie.genre._id)
      genre = await Genre.findById(req.body.genreId);

    movie.title = req.body.title || movie.title;
    movie.numberInStock = req.body.numberInStock || movie.numberInStock;
    movie.dailyRentalRate = req.body.dailyRentalRate || movie.dailyRentalRate;
    movie.genre = genre || movie.genre;

    movie = await movie.save();
    res.send(movie);
  } catch (err) {
    console.log(err);
    //return res.status(400).send(`${err.value} is invalid id`);
  }
});

movieRouter.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).send(`${req.params.id} is not found`);

    res.send(movie);
  } catch (err) {
    return res.status(404).send(`${err.value} is invalid id`);
  }
});

module.exports = movieRouter;
