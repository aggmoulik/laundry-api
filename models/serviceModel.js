const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const UserTranslatedServiceSchema = new Schema({
    name: String,
    description: String
});

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
    },
    tr: UserTranslatedServiceSchema
});

serviceSchema.set('toJSON', {
    transform: (doc, ret) => {
        return ret;
    }
});

module.exports = mongoose.model('services', serviceSchema, 'services');