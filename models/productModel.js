const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const UserTranslatedProductSchema = new Schema({
    name: String,
    description: String
});

let productSchema = new Schema({
    name: String,
    description: String,
    price: String,
    image: String,
    services: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'services'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    status: {
        type: Number,
        default: 1
    },
    tr: UserTranslatedProductSchema
});

productSchema.set('toJSON', {
    transform: (doc, ret) => {
        return ret;
    }
});

module.exports = mongoose.model('products', productSchema, 'products');