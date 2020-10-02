module.exports = function (err, req, res, next) {
    //LOG exception
    res.status(500).send('Something went wrong');
};
