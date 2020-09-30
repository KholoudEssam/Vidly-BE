const express = require('express');
const mongoose = require('mongoose');

const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customer');
const movies = require('./routes/movies');
const rentals = require('./routes/rental');

const app = express();

mongoose
  .connect('mongodb+srv://admin:123@cluster0.xjidd.mongodb.net/vidly', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to db...'))
  .catch((err) => console.log(err));

app.use(express.json());

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/', home);

app.listen(3000, () => console.log('Server is running...'));
