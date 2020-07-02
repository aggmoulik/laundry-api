const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let dashSchema = new Schema({
    images: [String]
});

module.exports = mongoose.model('dashboard', dashSchema, 'dashboard');