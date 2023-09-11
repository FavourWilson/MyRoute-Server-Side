const driverRepository = require("../repositories/driver-repository");
const userRepository = require("../repositories/user-repository");
const helpers = require("../helpers/index");

// save a driver booking
exports.saveDriverBooking = async (
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
) => {
  // find the user
  const user = await userRepository.getUserByID(userId);
  if (!user) return helpers.newError("User does not exist", 404);

  // find the driver profile
  if (user.driverBooking !== null)
    return helpers.newError("You have booked a ride as a driver", 403);

  // save the driver profile
  const createDriverBooking = await driverRepository.saveDriverBooking(
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

  await userRepository.updateUserProfile(user.email, {
    driverBooking: createDriverBooking._id,
  });
  return createDriverBooking;
};

// book a driver
exports.bookDriver = async (userID, driverID) => {
  const driverResult = await driverRepository.findDriverByID(driverID);

  const passengerArray = driverResult.savedBooking.passengers;

  const availableSeats =
    driverResult.savedBooking.seatsAvailable - passengerArray.length;

  passengerArray.push(userID);

  if (availableSeats > 0) {
    const bookedDriver = await driverRepository.addPassegers(
      passengerArray,
      driverID
    );
    return bookedDriver;
  }

  return helpers.newError("All seats are occupied", 400);
};
