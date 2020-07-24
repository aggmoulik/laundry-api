const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let serviceSchema = new Schema({
    name: String,
    image: String,
    description: String,
    fee_type: {
        type: String,
        enum: ['kg', 'unit'],
        default: 'kg'
    },
    status: {
        type: Number,
        default: 1
    }
});

serviceSchema.set('toJSON', {
    transform: (doc, ret) => {
        return ret;
    }
});

module.exports = mongoose.model('services', serviceSchema, 'services');