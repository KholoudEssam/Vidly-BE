const express = require('express');

const { User, validateReq } = require('./../models/user');

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

userRouter.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre)
            return res.status(404).send(`${req.params.id} is not found`);

        res.send(genre);
    } catch (err) {
        return res.status(404).send(`${err.value} is invalid id`);
    }
});

userRouter.post('/register', async (req, res) => {
    try {
        const { error } = validateReq(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User is already registered');

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        await user.save();
        res.send(user);
    } catch (err) {
        return res.status(400).send(err.message);
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const { error } = validateReq(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password,
        });
        if (!user) return res.status(404).send('User not found');

        res.send(user);
    } catch (err) {
        return res.status(400).send(err.message);
    }
});

module.exports = userRouter;
