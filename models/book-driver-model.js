const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookDriverSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "driver",
  },
  whereAreyouLeavingFrom: {
    type: String,
    required: [true, "Where are you going to"],
  },
  whereAreyouGoing: {
    type: String,
    required: [true, "Where are you going to"],
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
  preferredRoute: {
    type: String,
    required: [true, "Provide a route you are passing"],
    default: null,
  },
  whatTimeAreYouGoing: {
    type: String,
    required: [true, "Provide the time your are going"],
    default: null,
  }
});

const BookDriver = mongoose.model("user-booking", BookDriverSchema);

module.exports = BookDriver;
