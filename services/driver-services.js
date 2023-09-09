const handleImageUpload = require("../config/cloudinary-config");
const driverRepository = require("../repositories/driver-repository");
const userRepository = require("../repositories/user-repository");
const helpers = require("../helpers/index");

// setup driver handler
exports.createDriver = async (
  driverId,
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
) => {
  // upload all driver credentials
  const uploadDriverLicence = await handleImageUpload(driverLicense);
  const uploadOutsideCarPhoto = await handleImageUpload(outSideCarPhoto);
  const uploadInsideCarPhoto = await handleImageUpload(inSideCarPhoto);

  const userInfo = await userRepository.getUserByID(driverId);
  if (!userInfo)
    return helpers.newError(
      "User account does not exist, create a new account",
      404
    );

  const driverProfile = await driverRepository.findDriverByID(driverId);
  if (driverProfile)
    return helpers.newError("You are already a registered driver", 409);

  const driver = await driverRepository.createDriverAccount(
    driverId,
    referralCode,
    vehicleManufacturer,
    vehicleModel,
    vehicleYear,
    plateNumberLicense,
    vehicleColor,
    driverLicenseNumber,
    uploadDriverLicence.secure_url,
    driverLicenseExpiryDate,
    uploadOutsideCarPhoto.secure_url,
    uploadInsideCarPhoto.secure_url,
    address,
    bankAccountHolderName,
    bankAccountNumber,
    bankName
  );

  return driver;
};

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
