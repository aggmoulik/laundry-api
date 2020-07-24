const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const UserTranslatedBlogSchema = Schema({
    name: String,
    content: String
});

let blogSchema = new Schema({
    name: String,
    image: String,
    content: String,
    status: {
        type: Number,
        default: 1
    },
    tr: UserTranslatedBlogSchema
});


module.exports = mongoose.model('blogs', blogSchema, 'blogs');