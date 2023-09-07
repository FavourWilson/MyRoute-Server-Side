const User = require("../models/user-model");
const OTP = require("../models/OTP-model");
const ResetOTP = require("../models/reset-OTP-model");
const UserBooking = require("../models/user-booking-model")

const handleImageUpload = require("../config/cloudinary-config");

// check if user exist
const doesUserExist = async (email) => {
  const oldUser = await User.findOne({ email });
  return oldUser;
};

// get user email
const getUserByEmail = async (email) => {
  const getUserByEmail = await User.findOne({ email });
  return getUserByEmail;
};

// get user by ID
const getUserByID = async (_id) => {
  const getUserByID = await User.findById(_id);
  return getUserByID; 
}

// delete user OTP
const deleteOTP = async (email) =>  await OTP.findOneAndDelete({ email });

// find user OTP
const findOTP = async (email) => {
  const OTPCode = await OTP.findOne({ email });
  return OTPCode;
};

// create new user
const createNewUser = async (
  firstName,
  lastName,
  email,
  phone,
  gender,
  password,
  ninDocument
) => {
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    phone,
    gender,
    password,
    ninDocument,
  });

  return newUser;
};

// create new OTP
const createRegisterOtp = async (email, code) => {
  const _OTP = await findOTP(email);
  if (_OTP) deleteOTP(email);

  await new OTP({
    email: email,
    OTP: code,
    createdAt: Date.now(),
  }).save();

  return code;
};

// update user profile
const updateUserProfile = async (email, body) => {
  const userInfo = await User.findOne({ email });

  let _email = body.email ? body.email : userInfo.email;
  let _firstName = body.firstName ? body.firstName : userInfo.firstName;
  let _lastName = body.lastName ? body.lastName : userInfo.lastName;
  let _ninDocument = body.ninDocument 
    ? await handleImageUpload(body.ninDocument) 
    : userInfo.ninDocument;
  let _phone = body.phone ? body.phone : userInfo.phone;
  let _gender = body.gender ? body.gender : userInfo.gender;
  let _profilePic = body.profilePic
    ? await handleImageUpload(body.profilePic)
    : userInfo.profilePic;
  let _password = body.password ? body.password : userInfo.password;
  let _isVerified = body.isVerified ? body.isVerified : userInfo.isVerified;
  let _canResetPassword = body.canResetPassword ? body.canResetPassword : userInfo.canResetPassword

  // if profile picture is updated
  if(body.profilePic){
    const updateProfile =  await User.findOneAndUpdate(
      { email },
      {
        email: _email,
        firstName: _firstName,
        lastName: _lastName,
        profilePic: _profilePic.secure_url,
        ninDocument: _ninDocument,
        phone: _phone,
        gender: _gender,
        password: _password,
        isVerified: _isVerified,
        canResetPassword: _canResetPassword
      },
      { new: true }
    );
    return updateProfile
  }

  // if images are not updated
  const _updateProfile =  await User.findOneAndUpdate(
    { email },
    {
      email: _email,
      firstName: _firstName,
      lastName: _lastName,
      profilePic: _profilePic.secure_url,
      ninDocument: _ninDocument,
      phone: _phone,
      gender: _gender,
      password: _password,
      isVerified: _isVerified,
      canResetPassword: _canResetPassword
    },
    { new: true }
  );
  return _updateProfile  
};

// Reset OTP handlers
const findResetOTP = async (email) => {
  let passwordResetOTP = await ResetOTP.findOne({ email });
  return passwordResetOTP;
};

// delete OTP
const deleteResetOTP = async (email) =>  await ResetOTP.findOneAndDelete({ email });

// create reset OTP
const createResetOtp = async (email, hash) => {
  deleteResetOTP(email);

  await new ResetOTP({
    email: email,
    OTP: hash,
    createdAt: Date.now(),
  }).save();
};

// find user booking
const findUserBooking = async(userID) => {
  const userBookingProfile  = await UserBooking.findById(userID)
  return userBookingProfile
}

// save user booking
const saveUserBooking = async (
  userId,
  whereAreyouLeavingFrom,
  whereAreyouGoing,
  whenAreyouGoing,
  seatsAvailable,
  currentMapLocation,
  preferredRoute,
  whatTimeAreYouGoing
) => {

  const userBooking = await new UserBooking({
    userId,
    whereAreyouLeavingFrom,
    whereAreyouGoing,
    whenAreyouGoing,
    seatsAvailable,
    currentMapLocation,
    preferredRoute,
    whatTimeAreYouGoing
  }).save();

 return userBooking
};


module.exports = {
  getUserByEmail,
  createNewUser,
  createRegisterOtp,
  createResetOtp,
  deleteResetOTP,
  doesUserExist,
  updateUserProfile,
  findResetOTP,
  findOTP,
  deleteOTP,
  getUserByID,
  findUserBooking,
  saveUserBooking
};