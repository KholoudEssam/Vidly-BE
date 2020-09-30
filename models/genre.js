const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
});
function validateReq(data) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
    });

    return schema.validate(data);
}

const Genre = mongoose.model('Genre', genreSchema);

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validateReq = validateReq;
