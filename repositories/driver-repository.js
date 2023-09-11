const Driver = require("../models/driver-model");

// find driver profile
const findDriverByID = async (driverId) => {
  const driverProfile = await Driver.findOne({ driverId });
  return driverProfile;
};

const searchForDrivers = async (
  whereAreyouGoing,
  currentMapLocation
) => {
  const driverSearchResult = await Driver.find({ currentMapLocation, whereAreyouGoing })
  return driverSearchResult
}

// find driver booking
// const findDriverBooking = async(driverId) => {
//   const driverBookingProfile  = await DriverBooking.findOne({ driverId })
//   return driverBookingProfile
// }


// save driver booking
const saveDriverBooking = async (
  driverId,
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

  const driverBooking = await Driver.findOneAndUpdate({ driverId }, { 
    savedBooking : {
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
    }  
  }, {new: true})  
  return driverBooking;
};

// add more passengers
const addPassegers = async(passengerArray, driverid) => {
  const updatePassengers = await Driver.findOneAndUpdate({driverid}, 
    {
      savedBooking: {
        passengers: passengerArray
      }
    }, {new: true})
  

  return updatePassengers
}

module.exports = {
  findDriverByID,
  saveDriverBooking,
  searchForDrivers,
  addPassegers
};
