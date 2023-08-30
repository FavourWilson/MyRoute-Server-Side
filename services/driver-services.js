const handleImageUpload = require("../config/cloudinary-config");
const driverRepository = require("../repositories/driver-repository");

// setup driver handler
exports.createDriver = async (
  userId,
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
  const uploadDriverLicence =  await handleImageUpload(driverLicense)
  const uploadOutsideCarPhoto =  await handleImageUpload(outSideCarPhoto)
  const uploadInsideCarPhoto =  await handleImageUpload(inSideCarPhoto)

  const driverProfile =  await driverRepository.findDriverProfile(userId)
  if(driverProfile) return "You are already a registered driver"

  const driver =  await driverRepository.createDriverAccount(
    userId,
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
  )
  
  return driver
};
