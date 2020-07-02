const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let offerSchema = new Schema({
    offerName: String,
    discount: Number,
    code: String,
    image: String
});

module.exports = mongoose.model('offers', offerSchema, 'offers');