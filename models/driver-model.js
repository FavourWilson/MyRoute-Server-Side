const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  driverId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  referralCode: {
    type: String,
    default: null
  },
  vehicleManufacturer: {
    type: String,
    required: [true, "provide the manufacturer of the vehicle"],
    default: null
  },
  vehicleModel: {
    type: String,
    required: [true, "Vehicle model cannot be empty"],
    default: null
  },
  vehicleYear: {
    type: String,
    required: [true, "Vehicle year cannot be empty"],
    default: null
  },
  vehicleColor: {
    type: String,
    required: [true, "Vehicle color cannot be empty"],
    default: null
  },
  plateNumberLicense: {
    type: String,
    required: [true, "License plate number cannot be empty"],
    default: null
  },
  driverLicenseNumber: {
    type: String,
    required: [true, "driver license field cannot be empty"],
    default: null
  },
  driverLicense: {
    type: String,
    required: [true, "Driver License cannot be empty"],
    default: null,
  },
  driverLicenseExpiryDate: {
    type: String,
    required: [true, "Driver License Expiry Date cannot be empty"],
    default: null,
  },
  outSideCarPhoto: {
    type: String,
    required: [true, "Exterior image of your cannot be empty"],
    default: null,
  },
  inSideCarPhoto: {
    type: String,
    required: [true, "Interior image of your cannot be empty"],
    default: null,
  },
  address: {
    type: String,
    required: [true, "Address field cannot be empty"],
    default: null,
  },
  bankAccountHolderName: {
    type: String,
    required: [true, "Bank account holder name cannot be empty"],
    default: null,
  },
  bankAccountNumber: {
    type: Number,
    required: [true, "Bank account number cannot be empty"],
    default: null,
  },
  bankName: {
    type: String,
    required: [true, "Bank name cannot be empty"],
    default: null,
  },
  savedBooking: {
    pickupLocation: {
      type: String,
      default: null
    },
    dropOffLocation: {
      type: String,
      default: null
    },
    whenAreyouGoing: {
      type: String,
      default: null
    },
    seatsAvailable: {
      type: Number,
      default: null
    },
    currentMapLocation: {
      type: String,
      default: null
    },
    destination: {
      type: String,
      default: null
    },
    whatRouteAreYouPassing: {
      type: String,
      default: null,
    },
    whatTimeAreYouGoing: {
      type: String,
      default: null,
    },
    price: {
      type: String,
      default: null,
    },
    paymentMethod: [
      {
        type: String,
        default: null,
      } 
    ]
  }
});

const Driver = mongoose.model("driver", DriverSchema);

module.exports = Driver;
