const mongoose = require("mongoose");
const Schema = mongoose.Schema

// define the token schema
const codeVerificationSchema = new Schema({
  email: {
    type: String,
    require: true
  },
  verificationCode: {
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

const CodeVerification = mongoose.model("code_verification", codeVerificationSchema);
module.exports = CodeVerification