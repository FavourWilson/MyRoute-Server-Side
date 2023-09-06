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

  const driverProfile = await driverRepository.findDriverProfile(driverId);
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

exports.driverBooking = async (
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

  const driverProfile = await driverRepository.findDriverProfile(driverId);
  if (!driverProfile)
    return helpers.newError("You cannot save you booking, setup your driver account", 409);

  const findDriverBooking = await driverRepository.findDriverBooking(driverId)
  if (findDriverBooking)
    return helpers.newError("You booking has been saved already", 400);

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
