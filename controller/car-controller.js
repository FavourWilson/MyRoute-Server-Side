const { catchAsync } = require("../utils/catchAsync");
const carServices = require("../services/car-services");
const helpers = require("../helpers/index")

exports.createCar = async (req, res) => {
  try {
    const {
      userId,
      referralCode,
      vehicleManufacturer,
      vehicleModel,
      vehicleYear,
      plateNumberLicense,
      vehicleColor,
      driverLicenseNumber,
      driverLicense,
      driverLicenseExpiryDate,
      outSideCarPhoto,
      inSideCarPhoto,
      address,
      bankAccountHolderName,
      bankAccountNumber,
      bankName,
    } = req.body;

    await carServices.registerCar(
      userId,
      referralCode,
      vehicleManufacturer,
      vehicleModel,
      vehicleYear,
      plateNumberLicense,
      vehicleColor,
      driverLicenseNumber,
      driverLicense,
      driverLicenseExpiryDate,
      outSideCarPhoto,
      inSideCarPhoto,
      address,
      bankAccountHolderName,
      bankAccountNumber,
      bankName
    );

    return res.status(201).json(helpers.sendSuccess("Car registration successful", 201));
  } catch (error) {
    if (error.status)
      return res.status(error.status).json(helpers.sendError(error.message, error.status));
  }
};

exports.getAllCars = catchAsync(async (req, res, next) => {
  try {
    // Get all articles here
    const car = await Car.find();
    res.status(200).json({
      status: "success",
      data: { car },
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
      status: "success",
      data: { car },
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
      data: { car },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error,
    });
  }
});
