const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');

const { User, validateReq } = require('./../models/user');

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

userRouter.post('/register', async (req, res) => {
    try {
        const { error } = validateReq(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User is already registered');

        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();
        res.send(_.pick(user, ['name', 'email']));
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
