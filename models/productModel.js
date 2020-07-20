const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
    name: String,
    image: String,
    description: String,
    price: String,
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
    }
});

productSchema.set('toJSON', {
    transform: (doc, ret) => {
        return ret;
    }
});

module.exports = mongoose.model('products', productSchema, 'products');