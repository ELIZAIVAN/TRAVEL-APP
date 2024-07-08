const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { type } = require('./userValidationSchema');
const { required } = require('joi');

const userSchema = new mongoose.Schema({
    phonenumber: {
        type: Number,
    },
    password: {
        type: String,
    },
    image: {
        type: String
    },
    name: {
        type: String,
    },
    address: {
        type: String,

    },
    tokens: [{ type: String }],
});

userSchema.methods.hashToken = async function (token) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(token, salt);
};

const user = mongoose.model('user', userSchema)

module.exports = user;