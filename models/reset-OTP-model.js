const mongoose = require("mongoose");
const Schema = mongoose.Schema

// define the token schema
const ResetOTPSchema = new Schema({
  email: {
    type: String,
    require: true
  },
  OTP: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 1800,
  },
});

const ResetOTP = mongoose.model("resetotp", ResetOTPSchema);
module.exports = ResetOTP