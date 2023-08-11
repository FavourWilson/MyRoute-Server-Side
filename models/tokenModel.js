const mongoose = require("mongoose");
const Schema = mongoose.Schema

// define the token schema
const tokenSchema = new Schema({
  email: {
    type: String,
    require: true
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 1200,
  },
});

const Token = mongoose.model("token", tokenSchema);
module.exports = Token