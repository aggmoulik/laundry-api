const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const UserTranslatedCategorySchema = new Schema({
  app_name: String,
  invoice_label: String,
});

let settings = new Schema({
  app_name: String,
  splash_image: String,
  max_delivery_range: mongoose.Types.Decimal128,
  invoice_label: String,
  app_logo: String,
  order_min_charge: mongoose.Types.Decimal128,
  address: Object,
  status: {
    type: Number,
    default: 1,
  },
  tr: UserTranslatedCategorySchema,
});

const decimal2JSON = (v, i, prev) => {
  if (v !== null && typeof v === 'object') {
      if (v.constructor.name === 'Decimal128')
          prev[i] = v.toString();
      else
          Object.entries(v).forEach(([key, value]) => decimal2JSON(value, key, prev ? prev[i] : v));
  }
};

settings.set("toJSON", {
  transform: (doc, ret) => {
    let val = decimal2JSON(ret);
    return val;
  },
});

module.exports = mongoose.model("settings", settings, "settings");
