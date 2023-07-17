const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const appError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");
const { promisify } = require("util");
const dotenv = require("dotenv");
const Driver = require("../models/driverModel");
dotenv.config({ path: "./config.env" });



exports.createDriver = catchAsync(async (req, res, next) => {
	try {
		const {body}  = req.body
		const data = {
			license: req.body.licensePhoto,
            outSideCar: req.body.outSideCarPhoto,
            inSideCar: req.body.inSideCarPhoto
		}

		cloudinary.uploader.upload(data.license)
		.then((result) => {
		response.status(200).send({
			message: "success",
			result,
		});
		}).catch((error) => {
		response.status(500).send({
			message: "failure",
			error,
		});
        });
        
		cloudinary.uploader.upload(data.outSideCar)
		.then((result) => {
		response.status(200).send({
			message: "success",
			result,
		});
		}).catch((error) => {
		response.status(500).send({
			message: "failure",
			error,
		});
		});
		cloudinary.uploader.upload(data.inSideCar)
		.then((result) => {
		response.status(200).send({
			message: "success",
			result,
		});
		}).catch((error) => {
		response.status(500).send({
			message: "failure",
			error,
		});
		});
	

		
		const driver = await Driver.create(body);
		res.status(201).json({
			status: "success",
			data: {driver	},
		});

	}  catch (error) {
		console.error(error);
		res.status(500).json({
			status: "error",
			error: error.toString(),
		});
	}
});