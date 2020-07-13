const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let serviceSchema = new Schema({
    name: String,
    image: String,
    description: String
});

module.exports = mongoose.model('services', serviceSchema, 'services');