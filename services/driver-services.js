const driverRepository = require("../repositories/driver-repository");
const userRepository = require("../repositories/user-repository");
const helpers = require("../helpers/index");

// save a driver booking
exports.saveDriverBooking = async (
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
) => {
  // find the user
  const userInfo = await userRepository.getUserByID(driverId);
  if (!userInfo) return helpers.newError("User does not exist", 404);

  // find the driver profile
  const driverProfile = await driverRepository.findDriverByID(driverId);
  if (!driverProfile)
    return helpers.newError(
      "You cannot save you booking, setup your driver account",
      409
    );

  // save the driver profile
  const createDriverBooking = await driverRepository.saveDriverBooking(
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

  return createDriverBooking;
};

// book a driver
exports.bookDriver = async (userID, driverID) => {
  const driverResult = await driverRepository.findDriverByID(driverID);
  
  const passengerArray = driverResult.savedBooking.passengers

  const availableSeats =
    driverResult.savedBooking.seatsAvailable -
    passengerArray.length;

  passengerArray.push(userID)

  if (availableSeats > 0) {
    const bookedDriver = await driverRepository.addPassegers(passengerArray, driverID);
    return bookedDriver;
  }

  return helpers.newError("All seats are occupied", 400);
};
