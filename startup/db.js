const mongoose = require('mongoose');
const { logger } = require('../middleware/error');

module.exports = () => {
    mongoose
        .connect('mongodb+srv://admin:123@cluster0.xjidd.mongodb.net/vidly', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then(() => logger.info('Connected to DB'))
        .catch((err) => console.log(err.message));
};
