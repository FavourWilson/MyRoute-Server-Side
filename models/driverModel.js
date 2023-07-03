const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema({
	licensePhoto: {
        type: String,
        required: [true, "Driver License Photo cannot be empty"],
	},
	licenseExpiryDate: { 
        type: String,
        required: [true, "Driver License Expiry Date cannot be empty"],
	},
	outSideCarPhoto: {
        type: String,
        required: [true, "Exterior image of your cannot be empty"],
    },
	inSideCarPhoto: {
        type: String,
        required: [true, "Interior image of your cannot be empty"],
    },
    userId:{
        type:String,
    }

	
});

const Driver = mongoose.model("driver", DriverSchema);

module.exports = Driver;
