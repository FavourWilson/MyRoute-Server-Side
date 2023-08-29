const handleImageUpload = require("../config/cloudinary-config");
const driverRepository = require("../repositories/driver-repository");

exports.createDriver = (
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
  handleImageUpload(driverLicense).then((driverLicenseImg) => {
    handleImageUpload(outSideCarPhoto).then((outsideCarPhotoImg) => {
      handleImageUpload(inSideCarPhoto).then(async (insideCarPhotoImg) => {
       const createdDriver =  await driverRepository.createDriverAccount(
            userId,
            referralCode,
            vehicleManufacturer,
            vehicleModel,
            vehicleYear,
            plateNumberLicense,
            vehicleColor,
            driverLicenseNumber,
            driverLicenseImg.secure_url,
            driverLicenseExpiryDate,
            outsideCarPhotoImg.secure_url,
            insideCarPhotoImg.secure_url,
            address,
            bankAccountHolderName,
            bankAccountNumber,
            bankName
        )
        return; 
      });
    });
  });
};
