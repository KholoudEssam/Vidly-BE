const winston = require('winston');
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // new winston.transports.Console(),
        new winston.transports.MongoDB({
            db: 'mongodb+srv://admin:123@cluster0.xjidd.mongodb.net/vidly',
        }),
    ],
});

module.exports.logger = logger;

module.exports.error = function (err, req, res, next) {
    //LOG exception
    logger.error(err.message);

    res.status(500).send('Something went wrong');
};
