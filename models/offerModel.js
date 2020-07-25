const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const UserTranslatedOfferSchema = new Schema({
    name: String,
    description: String
});

let offerSchema = new Schema({
    name: String,
    code: String,
    total_coupon: Number,
    min_amount: Number,
    max_amount: Number,
    discount_percent: Number,
    discount_type: String,
    description: String,
    valid_start_date: Date,
    valid_end_date: Date,
    total_used: Number,
    status: {
        type: Number,
        default: 1
    },
    tr: UserTranslatedOfferSchema
});

offerSchema.set('toJSON', {
    transform: (doc, ret) => {
        return ret;
    }
});

module.exports = mongoose.model('offers', offerSchema, 'offers');