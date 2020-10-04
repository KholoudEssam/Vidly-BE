const express = require('express');

const { Genre, validateReq } = require('./../models/genre');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');

const genreRouter = express.Router();

genreRouter.get('/', async (req, res) => {
    //throw Error('Cannot get genres, there is an error');
    const genres = await Genre.find();
    res.send(genres);
});

genreRouter.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre)
            return res.status(404).send(`${req.params.id} is not found`);

        res.send(genre);
    } catch (err) {
        return res.status(404).send(`${err.value} is invalid id`);
    }
});

genreRouter.post('/', auth, async (req, res) => {
    const { error } = validateReq(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.send(genre);
});

genreRouter.put('/:id', auth, async (req, res) => {
    try {
        const { error } = validateReq(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let genre = await Genre.findById(req.params.id);
        if (!genre)
            return res.status(404).send(`${req.params.id} is not found`);

        genre.name = req.body.name;
        genre = await genre.save();
        res.send(genre);
    } catch (err) {
        return res.status(404).send(`${err.value} is invalid id`);
    }
});

genreRouter.delete('/:id', [auth, admin], async (req, res) => {
    try {
        const genre = await Genre.findByIdAndDelete(req.params.id);
        if (!genre)
            return res.status(404).send(`${req.params.id} is not found`);

        res.send(genre);
    } catch (err) {
        return res.status(404).send(`${err.value} is invalid id`);
    }
});

module.exports = genreRouter;
