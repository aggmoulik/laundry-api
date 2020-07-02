const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

let userSchema = new Schema({
    name: String,
    email: String,
    image: String,
    contact: String,
    password: String,
    jwtToken: String,
    location: {
        type: pointSchema,
        required: true
    },
});

module.exports = mongoose.model('users', userSchema, 'users');