const { catchAsync } = require("../utils/catchAsync");
const Car = require("../models/carModel");


exports.createCar = catchAsync(async (req, res, next) => {
	try {
		const { body } = req;

		console.log(body);

		// save the article here
		const car = await Car.create(body);

		res.status(201).json({
			status: "success",
			data: {car	},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			status: "error",
			error: error.toString(),
		});
	}
});

exports.getAllCars = catchAsync(async (req, res, next) => {
	try {
		// Get all articles here
		const car = await Car.find();
		res.status(200).json({
			status: "success",
			data: {car},
		}); 
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
});

exports.getOneCar = catchAsync(async (req, res, next) => {
	try {
		const { id } = req.params;

		// Get the article here
		const car = await Car.findById(id);
		res.status(200).json({
			status:"success",
			data: {car},
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
});

exports.updateCar = catchAsync(async (req, res, next) => {
	try {
		const { id } = req.params;

		// Update the article here

		const car = await Car.findByIdAndUpdate(id, req.body);
		res.status(200).json({
			status: "Updated successfully",
			data: {car},
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
});


