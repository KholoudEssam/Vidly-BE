require('express-async-errors');

const home = require('../routes/home');
const genres = require('../routes/genres');
const customers = require('../routes/customer');
const movies = require('../routes/movies');
const rentals = require('../routes/rental');
const user = require('../routes/user');
const { error } = require('../middleware/error');

module.exports = (app) => {
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/user', user);
    app.use('/', home);
    app.use(error);
};
