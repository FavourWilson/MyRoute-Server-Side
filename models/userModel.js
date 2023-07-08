const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	profilePic: {
		type: String,
	},
	ninDocument: {
		type: String,
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
	verificationCode: {
		type: String,
		required: [true, "Verification code cannot be empty"],
	},
	isActive: { type: Boolean, default: false },
	
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
