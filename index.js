const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
require('express-async-errors');
require('winston-mongodb');

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customer');
const movies = require('./routes/movies');
const rentals = require('./routes/rental');
const user = require('./routes/user');
const { error, logger } = require('./middleware/error');

const app = express();

// process.on('uncaughtException', (ex) => {
//     console.log('THERE IS UNHANDLED UNCAUGHT EXCEPTION.');
//     logger.error(ex.message);
// });
// throw new Error('There is an exception outside express context');

// console.log(config.get('jwtPrivateKey'));

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}
mongoose
    .connect('mongodb+srv://admin:123@cluster0.xjidd.mongodb.net/vidly', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log('Connected to db...'))
    .catch((err) => console.log(err.message));

app.use(express.json());

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/user', user);
app.use('/', home);

app.use(error);

app.listen(3000, () => console.log('Server is running...'));
