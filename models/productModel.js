const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
    name: String,
    image: String,
    description: String,
    price: String,
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'services'
    }],
    subcategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
    }]
});

productSchema.set('toJSON', {
    transform: (doc, ret) => {
        return ret;
    }
})

module.exports = mongoose.model('products', productSchema, 'products');