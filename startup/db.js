const mongoose = require('mongoose');
const { logger } = require('../middleware/error');
const config = require('config');

module.exports = () => {
    mongoose
        .connect(config.get('db'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then(() => logger.info('Connected to DB'))
        .catch((err) => console.log(err.message));
};
