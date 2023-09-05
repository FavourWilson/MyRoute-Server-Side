const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DriverBookingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "driver",
  },
  pickupLocation: {
    type: String,
    required: [true, "Provide a pick up location"],
  },
  dropOffLocation: {
    type: String,
    required: [true, "Provide a drop off location"],
  },
  whenAreyouGoing: {
    type: String,
    required: [true, "Where are you going to"],
  },
  seatsAvailable: {
    type: Number,
    required: [true, "How many seats are available"],
  },
  currentMapLocation: {
    type: String,
    required: [true, "Provide a current map location"],
  },
  destination: {
    type: String,
    required: [true, "Provide a destination"],
  },
  whatRouteAreYouPassing: {
    type: String,
    required: [true, "Provide a route you are passing"],
    default: null,
  },
  whatTimeAreYouGoing: {
    type: String,
    required: [true, "Provide the time your are going"],
    default: null,
  },
  price: {
    type: String,
    required: [true, "Provide your price"],
    default: null,
  },
  paymentMethod: [
    {
      type: String,
      required: [true, "Provide a payment method"],
      default: null,
    } 
  ]
});

const DriverBooking = mongoose.model("driver-booking", DriverBookingSchema);

module.exports = DriverBooking;
