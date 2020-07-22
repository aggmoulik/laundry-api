const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let blogSchema = new Schema({
    name: String,
    image: String,
    content: String,
    status: {
        type: Number,
        default: 1
    },
});


module.exports = mongoose.model('blogs', blogSchema, 'blogs');