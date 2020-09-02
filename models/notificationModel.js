const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    link: String,
    time: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    status: {
        type: Number,
        default: 1
    }
});

Schema.pre('save', function(next) {
    this.time = Date.now();
    next();
});

module.exports = mongoose.model('Notification', Schema, 'notifications');