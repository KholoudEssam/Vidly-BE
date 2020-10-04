const { logger } = require('../middleware/error');

module.exports = () => {
    // ONLY SYNC CODE
    // process.on('uncaughtException', (ex) => {
    //     console.log('THERE IS UNCAUGHT EXCEPTION.');
    //     logger.error(ex.message);
    //     process.exit(1);
    // });
    // throw new Error('There is an exception outside express context');
    // FOR ASYNC CODE - UNHANDLED PROMISE REJECTION
    // process.on('unhandledRejection', (ex) => {
    //     console.log('THERE IS UNHANDLED REJECTION');
    //     logger.error(ex.message);
    //     process.exit(1);
    // });
    // const p = Promise.reject(new Error('Something failed misrably'));
    // p.then(() => console.log('done'));
};
