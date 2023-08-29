const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
	CardNo: {
		type: String,
	},
	ExpiryDate: { 
		type: String,
	},
	SecureCode: {
		type: Number,
    },
    userId:{
        type:String,
    }

	
});

const Card = mongoose.model("card", CardSchema);

module.exports = Card;
