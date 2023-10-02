const Driver = require("../models/driver-booking-model");
const User = require("../models/user-model");

// find driver profile
const findDriverByID = async (driverId) => {
  const driverProfile = await Driver.findOne({ driverId });
  return driverProfile;
};

const searchForDrivers = async (whereAreyouGoing, currentMapLocation) => {
  const driverSearchResult = await Driver.find({
    currentMapLocation,
    whereAreyouGoing,
  });
  return driverSearchResult;
};

// save driver booking
const saveDriverBooking = async (
  pickupLocation,
  dropOffLocation,
  whenAreyouGoing,
  seatsAvailable,
  currentMapLocation,
  destination,
  whatRouteAreYouPassing,
  whatTimeAreYouGoing,
  price,
  paymentMethod
) => {
  const driverBooking = await new Driver({
    pickupLocation,
    dropOffLocation,
    whenAreyouGoing,
    seatsAvailable, 
    currentMapLocation,
    destination,
    whatRouteAreYouPassing,
    whatTimeAreYouGoing,
    price,
    paymentMethod,
  }).save();

  return driverBooking;
};

// add more passengers
const addPassegers = async (passengerArray, driverid) => {
  const updatePassengers = await Driver.findOneAndUpdate(
    { driverid },
    {
      savedBooking: {
        passengers: passengerArray,
      },
    },
    { new: true }
  );

  return updatePassengers;
};

const getTripDetails = async() => {
  const getUser = await User.findOne({ email })
  return getUser
}

module.exports = {
  findDriverByID,
  saveDriverBooking,
  searchForDrivers,
  addPassegers,
};
