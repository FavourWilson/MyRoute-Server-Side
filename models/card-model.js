const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  CVV: {
    type: String,
    default: null,
    required: true,
  },
  expiryDate: {
    type: String,
    default: null,
    required: true,
  },
  secureCode: {
    type: Number,
    default: null,
    required: true,
  },
});

const Card = mongoose.model("card", CardSchema);

module.exports = Card;
