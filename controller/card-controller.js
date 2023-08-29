const path = require("path");
const { catchAsync } = require("../utils/catchAsync");
const Card = require("../models/card-model");



exports.createCard = catchAsync(async (req, res, next) => {
	try {
		const { body } = req;

		console.log(body);

		// save the article here
		const card = await Card.create(body);

		res.status(201).json({
			status: "success",
			data: {card	},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			status: "error",
			error: error.toString(),
		});
	}
});

exports.getAllCards = catchAsync(async (req, res, next) => {
	try {
		// Get all articles here
		const card = await Card.find();
		res.status(200).json({
			status: "success",
			data: {card},
		}); 
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
});

exports.getOneCard = catchAsync(async (req, res, next) => {
	try {
		const { id } = req.params;

		// Get the article here
		const card = await Card.findById(id);
		res.status(200).json({
			status:"success",
			data: {card},
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
});

exports.updateCard = catchAsync(async (req, res, next) => {
	try {
		const { id } = req.params;

		// Update the article here

		const card = await Card.findByIdAndUpdate(id, req.body);
		res.status(200).json({
			status: "Updated successfully",
			data: {card},
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
});


