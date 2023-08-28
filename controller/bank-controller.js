const path = require("path");
const { catchAsync } = require("../utils/catchAsync");
const Bank = require("../models/bank-model");



exports.createBank = catchAsync(async (req, res, next) => {
	try {
		const { body } = req;
                                                                                                                                                                                                                                                                                                                                                                                                                                
		console.log(body);

		// save the article here
		const bank = await Bank.create(body);

		res.status(201).json({
			status: "success",
			data: {bank	},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			status: "error",
			error: error.toString(),
		});
	}
});

exports.getAllBanks = catchAsync(async (req, res, next) => {
	try {
		// Get all articles here
		const bank = await Bank.find();
		res.status(200).json({
			status: "success",
			data: {bank},
		}); 
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
});

exports.getOneBank = catchAsync(async (req, res, next) => {
	try {
		const { id } = req.params;

		// Get the article here
		const bank = await Bank.findById(id);
		res.status(200).json({
			status:"success",
			data: {bank},
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
});

exports.updateBank = catchAsync(async (req, res, next) => {
	try {
		const { id } = req.params;

		// Update the article here

		const bank = await Bank.findByIdAndUpdate(id, req.body);
		res.status(200).json({
			status: "Updated successfully",
			data: {bank},
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
});


