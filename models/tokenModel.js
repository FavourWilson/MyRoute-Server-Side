const mongoose = require("mongoose");
const Schema = mongoose.Schema

// define the token schema
const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "driver",
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