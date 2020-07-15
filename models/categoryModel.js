const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let category = new Schema({
    name: String,
    image: String,
    description: String
});

category.set('toJSON', {
    transform: (doc, ret) => {
        return ret;
    }
});

module.exports = mongoose.model('category', category, 'category');