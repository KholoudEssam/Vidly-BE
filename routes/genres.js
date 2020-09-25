const express = require("express");
const Joi = require("joi");

const genreRouter = express.Router();

const Genres = [
  { id: 1, genre: "Horror" },
  { id: 2, genre: "Romance" },
  { id: 3, genre: "Comedy" },
  { id: 4, genre: "Science Fiction" },
];

genreRouter.get("/", (req, res) => {
  res.send(Genres);
});

genreRouter.get("/:id", (req, res) => {
  const genre = Genres.find((g) => g.id === +req.params.id);
  if (!genre) return res.status(404).send(`${req.params.id} is not found`);

  res.send(genre);
});

genreRouter.post("/", (req, res) => {
  const { error } = validateReq(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const newGenre = {
    id: Genres.length + 1,
    genre: req.body.genre,
  };
  Genres.push(newGenre);

  res.send(Genres);
});

genreRouter.put("/:id", (req, res) => {
  const genre = Genres.find((g) => g.id === +req.params.id);
  if (!genre) return res.status(404).send(`${req.params.id} is not found`);

  const { error } = validateReq(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.genre = req.body.genre;
  res.send(genre);
});

genreRouter.delete("/:id", (req, res) => {
  const genre = Genres.find((g) => g.id === +req.params.id);
  if (!genre) return res.status(404).send(`${req.params.id} is not found`);

  Genres.splice(genre.id - 1, 1);

  res.send(genre);
});

function validateReq(data) {
  const schema = Joi.object({
    genre: Joi.string().min(3).required(),
  });

  return schema.validate(data);
}

module.exports = genreRouter;