const { catchAsync } = require("../utils/catchAsync");
const driverServices = require("../services/driver-services");
const helpers = require("../helpers");

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

    const _createDriver = await driverServices.createDriver(
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

    if (_createDriver) {
      if (_createDriver == "You are already a registered driver")
        return res
          .status(400)
          .json(helpers.sendError("you are already a registered driver", 400));

      return res
        .status(201)
        .json(helpers.sendSuccess("driver registration successful", 201));
    }

    // if(_createDriver !== "You are already a registered driver")
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      error: error.toString(),
    });
  }
});
