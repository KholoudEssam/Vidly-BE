const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User, validateReq } = require('./../models/user');
const config = require('config');

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

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).send('Invalid email or password');

        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid)
            return res.status(404).send('Invalid email or password..');

        const token = jwt.sign({ id: user._id }, config.get('jwtPrivateKey'));
        res.send(token);
        // res.send(_.pick(user, ['name', 'email']));
    } catch (err) {
        return res.status(400).send(err.message);
    }
});

module.exports = userRouter;
