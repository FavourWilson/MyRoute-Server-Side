const Driver = require("../models/driver-model");

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
  inSide_Car_Photo,
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
    inSide_Car_Photo,
    address,
    bankAccountHolderName,
    bankAccountNumber,
    bankName,
  }).save();

  return driver
};

module.exports = {
  createDriverAccount
};
