const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const distanceSchema = new Schema({
    max_distance: mongoose.Types.Decimal128,
    min_distance: mongoose.Types.Decimal128,
    charge: mongoose.Types.Decimal128,
});

const decimal2JSON = (v, i, prev) => {
    if (v !== null && typeof v === 'object') {
        if (v.constructor.name === 'Decimal128')
            prev[i] = v.toString();
        else
            Object.entries(v).forEach(([key, value]) => decimal2JSON(value, key, prev ? prev[i] : v));
    }
};

distanceSchema.set('toJSON', {
    transform: (doc, ret) => {
        let val = decimal2JSON(ret);
        return val;
    }
});


module.exports = mongoose.model('distance', distanceSchema, 'distance');
