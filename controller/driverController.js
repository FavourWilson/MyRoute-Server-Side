const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const appError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");
const { promisify } = require("util");
const dotenv = require("dotenv");
const Driver = require("../models/driverModel");
dotenv.config({ path: "./config.env" });

const cloudinary = require("../config/cloudinaryConfig");
const uploader = require("../config/cloudinaryConfig");


exports.createDriver = catchAsync(async (req, res, next) => {
	try {
		const {body}  = req.body
		const data = {
			license: req.body.licensePhoto,
            outSideCar: req.body.outSideCarPhoto,
            inSideCar: req.body.inSideCarPhoto
		}



		if(req.file) {
		const file = dataUri(req).content;
		return uploader.upload(file).then((result) => {
		const image = result.url;
		return res.status(200).json({
		messge: 'Your image has been uploded successfully to cloudinary',
		data: {
		image
		}

	// 	cloudinary.uploader.upload(data.license)
	// 	.then((result) => {
	// 	response.status(200).send({
	// 		message: "success",
	// 		result,
	// 	});
	// 	}).catch((error) => {
	// 	response.status(500).send({
	// 		message: "failure",
	// 		error,
	// 	});
    //     });
        
	// 	cloudinary.uploader.upload(data.outSideCar)
	// 	.then((result) => {
	// 	response.status(200).send({
	// 		message: "success",
	// 		result,
	// 	});
	// 	}).catch((error) => {
	// 	response.status(500).send({
	// 		message: "failure",
	// 		error,
	// 	});
	// 	});
	// 	cloudinary.uploader.upload(data.inSideCar)
	// 	.then((result) => {
	// 	response.status(200).send({
	// 		message: "success",
	// 		result,
	// 	});
	// 	}).catch((error) => {
	// 	response.status(500).send({
	// 		message: "failure",
	// 		error,
	// 	});
	// 	});
	

		
	// 	const driver = await Driver.create(body);
	// 	res.status(201).json({
	// 		status: "success",
	// 		data: {driver	},
	// 	});

	}  catch (error) {
		console.error(error);
		res.status(500).json({
			status: "error",
			error: error.toString(),
		});
	}
});