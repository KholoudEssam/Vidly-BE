const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: 'logger/error.log',
            level: 'error',
        }),
        new winston.transports.File({
            filename: 'logger/handleEx.log',
            handleExceptions: true,
            level: 'error',
        }),
        new winston.transports.File({
            filename: 'logger/info.log',
            handleExceptions: false,
            level: 'info',
        }),
        new winston.transports.File({
            filename: 'logger/rejections.log',
            level: 'error',
            handleRejections: true,
        }),
        new winston.transports.Console({ level: 'info' }),
        // new winston.transports.MongoDB({
        //     db: 'mongodb+srv://admin:123@cluster0.xjidd.mongodb.net/vidly',
        // }),
    ],
    // rejectionHandlers: [
    //     new winston.transports.File({ filename: 'logger/rejections.log' }),
    // ],
});

module.exports.logger = logger;

module.exports.error = function (err, req, res, next) {
    //LOG exception
    logger.error(err.message);

    res.status(500).send('Something went wrong');
};
