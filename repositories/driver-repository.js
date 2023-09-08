const Driver = require("../models/driver-model");

// find driver profile
const findDriverByID = async (driverId) => {
  const driverProfile = await Driver.findOne({ driverId });
  return driverProfile;
};

// find driver booking
// const findDriverBooking = async(driverId) => {
//   const driverBookingProfile  = await DriverBooking.findOne({ driverId })
//   return driverBookingProfile
// }

// create driver account
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

  return driver;
};

// save driver booking
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

  const driverBooking = await Driver.findOneAndUpdate({ driverId }, { 
    savedBooking : {
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
    }  
  }, {new: true})  
  return driverBooking;
};

module.exports = {
  createDriverAccount,
  findDriverByID,
  saveDriverBooking,
};
