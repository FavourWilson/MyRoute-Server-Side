const { catchAsync } = require("../utils/catchAsync");
const driverServices = require("../services/driver-services") 
const helpers = require("../helpers")

// Create driver API
exports.createDriver = catchAsync(async (req, res, next) => {
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

    driverServices.createDriver(
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
    )

    res.status.json(helpers.sendSuccess("Successful drivers registration", 201))
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      error: error.toString(),
    });
  }
});
