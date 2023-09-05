const Driver = require("../models/driver-model");
const DriverBooking = require("../models/driver-booking-model");


const findDriverProfile = async(userId) => {
  const driverProfile  = await Driver.findOne({ userId })
  return driverProfile
}

const findDriverBooking = async(userId) => {
  const driverBookingProfile  = await DriverBooking.findOne({ userId })
  return driverBookingProfile
}

const createDriverAccount = async (
  userId,
  referralCode,
  vehicleManufacturer,
  vehicleModel,
  vehicleYear,
  vehicleColor,
  plateNumberLicense,
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

  const driver = await new Driver({
    userId,
    referralCode,
    vehicleManufacturer,
    vehicleModel,
    vehicleYear,
    vehicleColor,
    plateNumberLicense,
    driverLicenseNumber,
    driverLicense,
    driverLicenseExpiryDate,
    outSideCarPhoto,
    inSideCarPhoto,
    address,
    bankAccountHolderName,
    bankAccountNumber,
    bankName,
  }).save();

 return driver
};

const saveDriverBooking = async (
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

  const driverBooking = await new DriverBooking({
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
  }).save();

 return driverBooking
};



module.exports = {
  createDriverAccount,
  findDriverProfile,
  saveDriverBooking,
  findDriverBooking,
};