const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const Product = require('./productModel');

const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    total_price: String,
    address: Object,
    order_date: Date,
    status: String,
    products: [Product],
});

orderSchema.set('toJSON', {
    transform: (doc, ret) => {
        return ret;
    }
});

module.exports = mongoose.model('orders', orderSchema, 'orders');