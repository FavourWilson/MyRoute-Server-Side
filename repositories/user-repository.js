const User = require("../models/user-model");
const OTP = require("../models/OTP-model");
const ResetOTP = require("../models/reset-OTP-model");
const handleImageUpload = require("../config/cloudinary-config");

// check if user exist
const doesUserExist = async (email, route) => {
  const oldUser = await User.findOne({ email });
  return oldUser;
};

// get user email
const getUser = async (userQuery, type) => {
  switch (type) {
    case "email":
      const getUserByEmail = await User.findOne({ email: userQuery });
      return getUserByEmail;

    case "ID":
      const getUserByID = await User.findById({ _id: userQuery });
      return getUserByID;
  }
};

const deleteOTP = async (email) => {
  await OTP.findOneAndDelete({ email })
}

// find OTP handler
const _OTP = async (email) => {
  const OTPCode = await OTP.findOne({ email });
  return OTPCode;
};


// create new user handler
const createNewUser = async ( firstName, lastName, email, phone, gender, password, ninDocument ) => {
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

// Register OTP handler
const createRegisterOtp = async (email, code) => {
  const OTP =  await _OTP(email);
  if(OTP) deleteOTP(email)

  await new OTP({
    email: email,
    OTP: code,
    createdAt: Date.now(),
  }).save();

  return code;
};

// update profile handler
const updateUserProfile = async (email, body, type) => {
  const userInfo = await User.findOne({email})

  let profilePic;
  if(body.profilePic){
    const profilepicture = await handleImageUpload(body.profilePic)
    profilePic = profilepicture.secure_url
  } else{
    userInfo.profilePic
  }
  
  let email = (body.email) ? body.email : userInfo.email;
  let firstName = (body.firstName) ? body.firstName : userInfo.firstName;
  let lastName = (body.lastName) ? body.lastName : userInfo.lastName;
  let ninDocument = (body.ninDocument) ? body.ninDocument : userInfo.ninDocument;
  let phone = (body.phone) ? body.phone : userInfo.phone;
  let gender = (body.gender) ? body.gender : userInfo.gender;
  let password = (body.password) ? body.password : userInfo.password;
  let isVerified = (body.isVerified) ? body.isVerified : userInfo.isVerified;

  User.findOneAndUpdate({email}, 
    {email, firstName, lastName, profilePic, ninDocument, phone, gender, password, isVerified},
    {new: true})
};

// Reset OTP handlers
const findResetOTP = async (email) => {
  let passwordResetOTP = await ResetOTP.findOne({ email });
  return passwordResetOTP;
};

const deleteResetOTP = async (email) => {
  await ResetOTP.findOneAndDelete({ email });
};

const createResetOtp = async (email, hash) => {
  deleteResetOTP(email);

  await new ResetOTP({
    email: email,
    OTP: hash,
    createdAt: Date.now(),
  }).save();
};

module.exports = {
  getUser,
  createNewUser,
  createRegisterOtp,
  createResetOtp,
  deleteResetOTP,
  doesUserExist,
  updateUserProfile,
  findResetOTP,
  _OTP,
  deleteOTP
};