const handleImageUpload = require("../config/cloudinary-config");
const userRepository = require("../repositories/user-repository");
const carRepository = require("../repositories/car-repository");
const helpers = require("../helpers/index");

const registerCar = async (
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

  try{
    // upload all driver images
    const uploadDriverLicence = await handleImageUpload(driverLicense);
    const uploadOutsideCarPhoto = await handleImageUpload(outSideCarPhoto);
    const uploadInsideCarPhoto = await handleImageUpload(inSideCarPhoto);
  
    const user = await userRepository.getUserByID(userId);
    if (!user)
      return helpers.newError(
        "User account does not exist, create a new account",
        404
      );
  
    if (user.isVerified == false)
      return helpers.newError("User is not yet verified.", 401);
  
    if(user.car !== null)
        return helpers.newError("You have registered your car already", 403)
  
    const registeredCar = await carRepository.registerCar(
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
  
    await userRepository.updateUserProfile(user.email, { car: registeredCar._id });
    return registeredCar;
  }catch(error){
    helpers.newError(error.message, error.http_code);
  }

};

module.exports = {
  registerCar,
};
