const Car = require("../models/car-model")

// create driver account
const registerCar = async (
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
  const registeredCar = await new Car({
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

  return registeredCar;
};


module.exports = {
    registerCar
}