const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const bcryptSalt = process.env.BCRYPT_SALT;

const UserSchema = new mongoose.Schema({
  profilePic: {
    type: String,
    default: null,
  },
  ninDocument: {
    type: String,
    default: null,
	  required: [true, "provide Government issued ID card (NIN / Drivers licence)"]
  },
  firstName: {
    type: String,
    required: [true, "firstname cannot be empty"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "lastName cannot be empty"],
  },
  email: {
    type: String,
    required: [true, "email cannot be empty"],
    unique: true
  },
  phone: {
    type: String,
    required: [true, "phone number cannot be empty"],
  },
  gender: {
    type: String,
    required: [true, "Gender cannot be empty"],
  },
  password: {
    type: String,
    required: [true, "Password cannot be empty"],
  },
  isActive: { type: Boolean, default: false },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
  this.password = hash;
  next();
});

const User = mongoose.model("user", UserSchema);
module.exports = User 

