const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let subcatSchema = new Schema({
    name: String,
    image: String,
    description: String
});

module.exports = mongoose.model('subcategory', subcatSchema, 'subcategory');