const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const UserTranslatedCategorySchema = new Schema({
    name: String,
    description: String
});

let category = new Schema({
    name: String,
    image: String,
    description: String,
    status: {
        type: Number,
        default: 1
    },
    tr: UserTranslatedCategorySchema
});

category.set('toJSON', {
    transform: (doc, ret) => {
        return ret;
    }
});

module.exports = mongoose.model('category', category, 'category');