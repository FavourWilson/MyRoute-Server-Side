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

    await driverServices.createDriver(
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

    return res
      .status(201)
      .json(helpers.sendSuccess("driver registration successful", 201));
  } catch (error) {
    if (error.status)
      return res
        .status(error.status)
        .json(helpers.sendError(error.message, error.status));
  }
});

// Create driver
exports.driverBooking = catchAsync(async (req, res, next) => {
  try {
    const {
      userId,
      pickupLocation,
      dropOffLocation,
      whenAreyouGoing,
      seatsAvailable,
      currentMapLocation,
      destination,
      whatRouteAreYouPassing,
      whatTimeAreYouGoing,
      price,
      paymentMethod,
    } = req.body;

    await driverServices.driverBooking(
      userId,
      pickupLocation,
      dropOffLocation,
      whenAreyouGoing,
      seatsAvailable,
      currentMapLocation,
      destination,
      whatRouteAreYouPassing,
      whatTimeAreYouGoing,
      price,
      paymentMethod
    );

    return res
      .status(201)
      .json(helpers.sendSuccess("driver booking successful saved", 201));
  } catch (error) {
    if (error.status)
      return res
        .status(error.status)
        .json(helpers.sendError(error.message, error.status));
  }
});
