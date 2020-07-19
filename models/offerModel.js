const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let offerSchema = new Schema({
    name: String,
    code: String,
    description: String,
    type: String,
    discount: Number,
    status: Number,
    start_date: Date,
    end_date: Date,
});

offerSchema.set('toJSON', {
    transform: (doc, ret) => {
        return ret;
    }
});

module.exports = mongoose.model('offers', offerSchema, 'offers');