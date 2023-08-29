const mongoose = require("mongoose");

const BankSchema = new mongoose.Schema({
	bankName: {
		type: String,
		required: [true, "firstname cannot be empty"]
	},
	acctName: {
		type: String,
		required: [true, "lastName cannot be empty"],
	},
	acctNo: {
		type: String,
		required: [true, "email cannot be empty"],
	},
	userId: {
		type: String,
	},
	
	
});

const Bank = mongoose.model("bank", BankSchema);

module.exports = Bank;
