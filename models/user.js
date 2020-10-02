const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const { boolean } = require('joi');

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
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

userSchema.methods.generateToken = function () {
    return jwt.sign(
        { _id: this._id, isAdmin: this.isAdmin },
        config.get('jwtPrivateKey')
    );
};

function validateReq(data) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(255),
        email: Joi.string().required().min(2).max(255).email(),
        password: Joi.string().required().min(8).max(255),
        isAdmin: Joi.boolean(),
    });

    return schema.validate(data);
}

module.exports.User = mongoose.model('User', userSchema);
module.exports.validateReq = validateReq;
