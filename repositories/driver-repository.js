const Driver = require("../models/driver-model");
const DriverBooking = require("../models/driver-booking-model");


const findDriverProfile = async(driverId) => {
  const driverProfile  = await Driver.findById(driverId)
  return driverProfile
}

const findDriverBooking = async(driverId) => {
  const driverBookingProfile  = await DriverBooking.findById(driverId)
  return driverBookingProfile
}

const createDriverAccount = async (
  driverId,
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
    driverId,
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

  const driverBooking = await new DriverBooking({
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
  }).save();

 return driverBooking
};

module.exports = {
  createDriverAccount,
  findDriverProfile,
  saveDriverBooking,
  findDriverBooking,
};