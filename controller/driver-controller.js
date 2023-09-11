const { catchAsync } = require("../utils/catchAsync");
const driverServices = require("../services/driver-services");
const helpers = require("../helpers");

// // Create driver API
// exports.createDriver = catchAsync(async (req, res, next) => {
//   try {
//     const {
//       driverId,
//       referralCode,
//       vehicleManufacturer,
//       vehicleModel,
//       vehicleYear,
//       plateNumberLicense,
//       vehicleColor,
//       driverLicenseNumber,
//       driverLicense,
//       driverLicenseExpiryDate,
//       outSideCarPhoto,
//       inSideCarPhoto,
//       address,
//       bankAccountHolderName,
//       bankAccountNumber,
//       bankName,
//     } = req.body;

//     await driverServices.createDriver(
//       driverId,
//       referralCode,
//       vehicleManufacturer,
//       vehicleModel,
//       vehicleYear,
//       plateNumberLicense,
//       vehicleColor,
//       driverLicenseNumber,
//       driverLicense,
//       driverLicenseExpiryDate,
//       outSideCarPhoto,
//       inSideCarPhoto,
//       address,
//       bankAccountHolderName,
//       bankAccountNumber,
//       bankName
//     );

//     return res
//       .status(201)
//       .json(helpers.sendSuccess("driver registration successful", 201));
//   } catch (error) {
//     if (error.status)
//       return res
//         .status(error.status)
//         .json(helpers.sendError(error.message, error.status));
//   }
// });

// setup driver booking
exports.driverBooking = catchAsync(async (req, res, next) => {
  try {
    const {
      driverId,
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

    await driverServices.saveDriverBooking(
      driverId,
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

    return res.status(201).json(helpers.sendSuccess("driver booking successful saved", 201));
  } catch (error) {
    if (error.status)
      return res.status(error.status).json(helpers.sendError(error.message, error.status));
  }
});