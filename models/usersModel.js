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
    firstname: String,
    lastname: String,
    username: String,
    role: String,
    email: String,
    image: String,
    mobile_no: String,
    password: String,
    refresh_token: String,
    access_token: String,
    location: {
        type: pointSchema,
    },
    last_login: Date,
    google_id: String,
    facebook_id: String,
    status: {
        type: Number,
        default: 1
    },
    source: {
        type: String,
        enum: ['WAP', 'WEB', 'IOS', 'ANDROID'],
        default: 'WEB'
    }
});

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        return ret;
    }
});

module.exports = mongoose.model('users', userSchema, 'users');