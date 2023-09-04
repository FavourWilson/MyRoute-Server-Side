const mongoose = require("mongoose");
const Schema = mongoose.Schema

// define the token schema
const OTP = new Schema({
  email: {
    type: String,
    require: true
  },
  OTP: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 1200,
  },
});

// setup model on mongoose
const OTPCode = mongoose.model("otp", OTP);
module.exports = OTPCode