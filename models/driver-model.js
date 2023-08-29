const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  user_Id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  referral_Code: {
    type: String,
  },
  vehicle_Manufacturer: {
    type: String,
    required: [true, "provide the manufacturer of the vehicle"],
  },
  vehicle_Model: {
    type: String,
    required: [true, "Vehicle model cannot be empty"],
  },
  vehicle_year: {
    type: String,
    required: [true, "Vehicle year cannot be empty"],
  },
  vehicle_color: {
    type: String,
    required: [true, "Vehicle color cannot be empty"],
  },
  plate_number_license: {
    type: String,
    required: [true, "License plate number cannot be empty"],
  },
  driver_license_number: {
    type: String,
    required: [true, "driver license field cannot be empty"],
  },
  driver_license: {
    type: String,
    required: [true, "Driver License cannot be empty"],
    default: null,
  },
  driver_license_expiry_Date: {
    type: String,
    required: [true, "Driver License Expiry Date cannot be empty"],
    default: null,
  },
  outSide_Car_Photo: {
    type: String,
    required: [true, "Exterior image of your cannot be empty"],
    default: null,
  },
  inSide_Car_Photo: {
    type: String,
    required: [true, "Interior image of your cannot be empty"],
    default: null,
  },
  address: {
    type: String,
    required: [true, "Address field cannot be empty"],
    default: null,
  },
  bank_account_holder_name: {
    type: String,
    required: [true, "Bank account holder name cannot be empty"],
    default: null,
  },
  bank_account_number: {
    type: String,
    required: [true, "Bank account number cannot be empty"],
    default: null,
  },
  bank_name: {
    type: String,
    required: [true, "Bank name cannot be empty"],
    default: null,
  },
});

const Driver = mongoose.model("driver", DriverSchema);

module.exports = Driver;
