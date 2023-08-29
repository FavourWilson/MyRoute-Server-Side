const bcrypt = require("bcrypt");
const crypto = require("crypto");
const userRepository = require("../repositories/user-repository");
const handleImageUpload = require("../config/cloudinary-config");
const helpers = require("../helpers");

const bcryptSalt = process.env.BCRYPT_SALT;

// signup user services
const createUser = async (firstName, lastName, email, phone, gender, password, ninDocument) => {
  const oldUser =  await userRepository.doesUserExist(email, "signup");
  if(oldUser) return { oldUser }

  const OTPCode =  helpers.OTP()

  // upload nin to cloudinary and create account
  const handleUpload = handleImageUpload(ninDocument)
    .then(async (ninDocument) => {
      const newUser = await userRepository.createNewUser(firstName, lastName, email, phone, gender, password, ninDocument.secure_url);
      const registeredOTP = await userRepository.createRegisterOtp(email, OTPCode);

      return {
        newUser,
        registeredOTP
      };
    })
    .catch((err) => {
      console.log(err)
    });

  return handleUpload;
};

// login user services
const loginUser = async (email, password) => {
  const userInfo = await userRepository.doesUserExist(email, "login");
  if(!userInfo) return { oldUser: false }

  // compare password
  const isPasswordCorrect = await bcrypt.compare( password, userInfo.password);
  if (!isPasswordCorrect) return {isPasswordCorrect: false};

  return userInfo
};

// forget password
const forgotPassword = async (email) => {
  const userInfo = await userRepository.getUser(email, "email");
  await userRepository._OTP(email, "find-and-delete");

  // implementing a reset token and hashing it using bcrypt
  let resetOTP = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetOTP, Number(bcryptSalt));

  await userRepository.createResetOtp(email, hash)

  return {userInfo, resetOTP};
};

const resetPassword = async (email, OTP, password) => {
  let passwordResetOTP = await userRepository.findResetOTP(email);

  const isValid = await bcrypt.compare(OTP, passwordResetOTP.OTP);
  if (!isValid) return res.status(404).json(helpers.sendError("Invalid or expired password reset token", 404));

  // hash the new password
  const hash = await bcrypt.hash(password, Number(bcryptSalt));

  await userRepository.updateProfile(email, hash, "password-update")
  await userRepository.deleteResetOTP(email);

  const getUserEmail = await userRepository.getUser(email, "email")
  return getUserEmail
};

const verifyUser = async(email, OTP) => {
  await userRepository.getUser(email, "email");

  // check if codeVerification is valid
  const OTPCode = await userRepository.token(email, "find");

  if (OTP !== OTPCode.OTP) return res.status(400).json(helpers.sendError("Not successfully verified", 400));
  res.status(200).json(helpers.sendSuccess("Verification code successfully verified", 200));

  await userRepository.updateProfile(user, true, "user-verification-update");
  await userRepository.token(email, "find-and-delete")
}

const resendOtp = async (email) => {
  // create verification code
  const OTP = helpers.OTP()

  const user =  await userRepository.getUser(email, "email");
  await userRepository.createRegisterOtp(user.email, OTP)
  
  return {OTP, user}
};


// update account handler
const updateAccount = async(email, profilePic, type) => {
  const getUser =  await userRepository.getUser(email, "email")
  
  if (profilePic) {
    handleImageUpload(profilePic).then(async (profilePicture) => {
      const updatedProfile = await userRepository.updateProfile(email, profilePicture.secure_url, type)

      res.status(200).json( helpers.sendSuccess("profile picture has been successfully updated", 200), updatedProfile.profileUpdate);
    });
  }
}

module.exports = {
  createUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyUser,
  resendOtp,
  updateAccount
};