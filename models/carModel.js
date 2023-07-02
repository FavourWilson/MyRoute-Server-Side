const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
	referralCode: {
		type: String,
	},
	vehicleManfac: {
        type: String,
        required: [true, "Vehicle Manfacturer cannot be empty"],
	},
	vehicleModel: {
		type: String,
		required: [true, "Vehicle Model cannot be empty"],
		
	},
	vehicleYear: {
		type: String,
		required: [true, "Vehicle Year cannot be empty"],
	},
	carLicenseNo: {
		type: String,
		required: [true, "Vehicle License Number cannot be empty"],
	},
	vehicleColor: {
		type: String,
		required: [true, "Vehicle Color cannot be empty"],
	},
	userId: {
		type: String,
		
	},
	
	
});

const car = mongoose.model("car", CarSchema);

module.exports = car;
