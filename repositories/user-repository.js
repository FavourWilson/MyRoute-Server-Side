const User = require("../models/user-model");
const OTP = require("../models/OTP-model");
const helpers = require("../helpers");

// check if user exist
const doesUserExist = async (email, route) => {
  switch (route) {
    case "signup": {
      const oldUser = await User.findOne({ email });
      return oldUser
    }

    case "login": {
      const oldUser = await User.findOne({ email });
      return oldUser
    }

    default: return "pass in the specific route for this handler";
  }
};

// get user email
const getUser = async (userQuery, type, res) => {
  switch (type) {
    case "email":
      const getUserByEmail = await User.findOne({ email: userQuery});

      if (!getUserByEmail) return res.status(404).json(helpers.sendError("Email does not exist", 404));
      return getUserByEmail;

    case "ID":
      const getUserByID = await User.findById({_id: userQuery});
      if (getUserByID) return;

      return getUserByID;
  }
};

// find token
const token = async (email, type) => {
  switch (type) {
    case "find-and-delete": {
      const token = await OTP.findOne({ email });
      if (token) await OTP.deleteOne();
    }

    case "find": {
      const token = await OTP.findOne({ email });
      if (!token) return "Invalid or expired password reset token"
        // return res.status(404).json(helpers.sendError("Invalid or expired password reset token", 404));
    }
  }
};

// create new user
const createNewUser = async (firstName, lastName, email, phone, gender, password, ninDocument) => {
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

// create Register OTP
const createRegisterOtp = async (email, code) => {
  token(email, "find-and-delete");

  await new OTP({
    email: email,
    OTP: code,
    createdAt: Date.now(),
  }).save();

  return code;
};

const updateProfile = async (email, value, type) => {
  switch (type) {
    case "password-update":
      await User.updateOne(
        { email: email },
        { $set: { password: value } },
        { new: true }
      );

    case "user-verification-update":
      await User.updateOne(
        { email: email },
        { $set: { isVerified: value } },
        { new: true }
      );

    case "update-profile-image":
      const profileUpdate =  await User.updateOne(
        { email: email },
        { $set: { profilePic: value } },
        { new: true }
      );

      return profileUpdate

    default:
      console.log("");
  }
};

// const getCodebyEmail = async (email) => {};

// const activateEmail = async (email) => {};

// const createResetOtp = async (user_id) => {};

// const validateResetCode = async (email, code) => {};

// const updateResetStatus = async (email, code) => {};

// const updatePassword = async (email, password) => {};

module.exports = {
  getUser,
  createNewUser,
  createRegisterOtp,
  token,
  doesUserExist,
  updateProfile,
};
