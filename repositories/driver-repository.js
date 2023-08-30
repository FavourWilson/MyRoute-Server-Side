const Driver = require("../models/driver-model");


const findDriverProfile = async(userId) => {
  const driverProfile  = await Driver.findOne({ userId })
  // console.log(driverProfile)
  return driverProfile
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

  findDriverProfile(userId)
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

module.exports = {
  createDriverAccount,
  findDriverProfile
};