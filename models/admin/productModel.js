const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
    name: String,
    image: String,
    description: String,
    price: String,
    category: [mongoose.ObjectId],
    subCategory: [mongoose.ObjectId]
});

module.exports = mongoose.model('products', productSchema, 'products');