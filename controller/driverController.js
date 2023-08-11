const appError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

const Driver = require("../models/driverModel")
const handleImgUpload = require("../utils/cloudinary/cloudinary");

// Create driver API
exports.createDriver = catchAsync(async (req, res, next) => {
  try {
    const {
      user_Id,
      referral_code,
      vehicle_Manufacturer,
      vehicle_Model,
      vehicle_year,
      plate_number_license,
      driver_license_number,
      driver_license,
      driver_license_expiry_Date,
      outSide_Car_Photo,
      inSide_Car_Photo,
      address,
      bank_account_holder_name,
      bank_account_number,
      bank_name,
    } = req.body;

    // upload all driver credentials
    handleImgUpload(driver_license).then((driver_license_img) => {
      handleImgUpload(outSide_Car_Photo).then((outside_car_photo_img) => {
        handleImgUpload(inSide_Car_Photo).then(async(inside_car_photo_img) => {
          await new Driver({
            user_Id,
            referral_code,
            vehicle_Manufacturer,
            vehicle_Model,
            vehicle_year,
            plate_number_license,
            driver_license_number,
            driver_license: driver_license_img.secure_url,
            driver_license_expiry_Date,
            outSide_Car_Photo: outside_car_photo_img.secure_url,
            inSide_Car_Photo: inside_car_photo_img.secure_url,
            address,
            bank_account_holder_name,
            bank_account_number,
            bank_name
          }).save();
        })
      })
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      error: error.toString(),
    });
  }
});
