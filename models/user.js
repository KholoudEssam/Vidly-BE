const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 2,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024,
    },
});

function validateReq(data) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(255),
        email: Joi.string().required().min(2).max(255).email(),
        password: Joi.string().required().min(8).max(255),
    });

    return schema.validate(data);
}

module.exports.User = mongoose.model('User', userSchema);
module.exports.validateReq = validateReq;
