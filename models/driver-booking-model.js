const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  pickupLocation: {
    type: String,
    default: null,
  },
  dropOffLocation: {
    type: String,
    default: null,
  },
  whenAreyouGoing: {
    type: String,
    default: null,
  },
  seatsAvailable: {
    type: Number,
    default: null,
  },
  currentMapLocation: {
    type: String,
    default: null,
  },
  destination: {
    type: String,
    default: null,
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
    },
  ],
  passengers: [
    {
      type: String,
      default: null,
    },
  ],
});

const Driver = mongoose.model("driver-booking", DriverSchema);

module.exports = Driver;
