const express = require("express");
const Joi = require("joi");
const app = express();

const Genres = [
  { id: 1, genre: "Horror" },
  { id: 2, genre: "Romance" },
  { id: 3, genre: "Comedy" },
  { id: 4, genre: "Science Fiction" },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/genres", (req, res) => {
  res.send(Genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = Genres.find((g) => g.id === +req.params.id);
  if (!genre) return res.status(404).send(`${req.params.id} is not found`);

  res.send(genre);
});

app.post("/api/genres", (req, res) => {
  const { error } = validateReq(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const newGenre = {
    id: Genres.length + 1,
    genre: req.body.genre,
  };
  Genres.push(newGenre);

  res.send(Genres);
});

app.put("/api/genres/:id", (req, res) => {
  const genre = Genres.find((g) => g.id === +req.params.id);
  if (!genre) return res.status(404).send(`${req.params.id} is not found`);

  const { error } = validateReq(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.genre = req.body.genre;
  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  const genre = Genres.find((g) => g.id === +req.params.id);
  if (!genre) return res.status(404).send(`${req.params.id} is not found`);

  Genres.splice(genre.id-1, 1);

  res.send(genre);
});

app.listen(3000, () => console.log("Server is running..."));

function validateReq(data) {
  const schema = Joi.object({
    genre: Joi.string().min(3).required(),
  });

  return schema.validate(data);
}
