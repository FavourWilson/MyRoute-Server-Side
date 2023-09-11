const { catchAsync } = require("../utils/catchAsync");
const driverServices = require("../services/driver-services");
const helpers = require("../helpers");

// setup driver booking
exports.saveDriverBooking = async (req, res, next) => {
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

    await driverServices.saveDriverBooking(
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

    return res.status(201).json(helpers.sendSuccess("driver booking successful saved", 201));
  } catch (error) {
    if (error.status)
      return res.status(error.status).json(helpers.sendError(error.message, error.status));
  }
};