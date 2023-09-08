const userServices = require("../services/user-services");
const helpers = require("../helpers");
const mailer = require("../mailer");
const { catchAsync } = require("../utils/catchAsync");

// handle user login
exports.login = catchAsync(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userServices.loginUser(email, password);
    return res.status(200).json(helpers.createSendToken(res, 200, user));
  } catch (error) {
    if(error.status)
      return res.status(error.status).json(helpers.sendError(error.message, error.status)) 
  }
});

// Handle user signup
exports.signUp = catchAsync(async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, gender, password, ninDocument } = req.body;

    const user = await userServices.createUser( firstName, lastName, email, phone, gender, password, ninDocument);
    
    helpers.createSendToken(res, 201, user.newUser);
    mailer.sendVerificationCode(email, "Verify your account", { name: firstName, verificationCode: user.registeredOTP});
  } catch (error) {
    if(error.status)
      return res.status(error.status).json(helpers.sendError(error.message, error.status))
  }
});

// Handle user forget password
exports.forgetPassword = async (req, res) => {
  try {
    const { email, clientURL } = req.body;

    const user = await userServices.forgotPassword(email);
    const link = `${clientURL}/passwordReset?token=${user.resetOTP}&id=${user.userInfo._id}`;

    mailer.forgetPasswordMail(user.userInfo.email, "Password Reset Request", { link, name: user.userInfo.firstName});
    res.status(200).json(helpers.sendSuccess("message sent successfully, check your mail", 200));
  } catch (err) {
    if(err.status)
      return res.status(err.status).json(helpers.sendError(err.message, err.status))
  }
};

// / Handle user password reset
exports.resetPassword = async (req, res) => {
  try {
    const { email, resetOTP, password } = req.body;

    const user = await userServices.resetPassword(email, resetOTP, password);
    
    mailer.resetPasswordMail(user.email, "Password Reset Successfully", { name: user.firstName });
    res.status(200).json(helpers.sendSuccess("Password reset was successful", 200));
  } catch (error) {
    if(error.status)
      return res.status(error.status).json(helpers.sendError(error.message, error.status))
  }
};

// Handle verify user
exports.verifyOTP = async (req, res) => {
  try {
    const { email, OTP } = req.body;

    await userServices.verifyUser(email, OTP);
    return res.status(200).json(helpers.sendSuccess("OTP successfully verified", 200));
  } catch (error) {
    if(error.status){
      return res.status(error.status).json(helpers.sendError(error.message, error.status))
    }
  }
};

// Handle OTP resend verification code
exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const resendOTP = await userServices.resendOtp(email);

    mailer.sendVerificationCode(resendOTP.user.email, "Verify your account", {
      name: resendOTP.user.firstName,
      verificationCode: resendOTP.OTP,
    });

    res.status(200).json(helpers.sendSuccess("OTP sent, check your mail", 200));
  } catch (error) {
    if(error.status){
      return res.status(error.status).json(helpers.sendError(error.message, error.status))
    }
  }
};

// Handle user account update
exports.updateAccount = async (req, res) => {
  try{
    await userServices.updateAccount( req.body.email, req.body);
    res.status(200).json(helpers.sendSuccess("profile has been successfully updated", 200));
  }catch(error){
    if(error.status)
     return res.status(error.status).json(helpers.sendError(error.message, error.status));
  }
};

// setup driver booking
exports.userBooking = catchAsync(async (req, res, next) => {
  try {
    const {
      userId,
      whereAreyouLeavingFrom,
      whereAreyouGoing,
      whenAreyouGoing,
      seatsAvailable,
      currentMapLocation,
      preferredRoute,
      whatTimeAreYouGoing
    } = req.body;

    await userServices.userBooking(
      userId,
      whereAreyouLeavingFrom,
      whereAreyouGoing,
      whenAreyouGoing,
      seatsAvailable,
      currentMapLocation,
      preferredRoute,
      whatTimeAreYouGoing
    );

    return res.status(201).json(helpers.sendSuccess("user booking successful saved", 201));
  } catch (error) {
    if (error.status)
      return res.status(error.status).json(helpers.sendError(error.message, error.status));
  }
});

exports.searchRide = async (req, res) => {
  try{
    const { currentMapLocation } = req.query
    // await userServices.createUser()
  }catch(error){
    if(error.status)
      return res.status(error.status).json(helpers.sendError(error.message, error.status)) 
  }
}

exports.deleteUser = async (req, res) => {
  try {
    await userServices.deleteUser(req.params.email);
    return res.status(200).json(helpers.sendSuccess("user successfully deleted", 200));
  } catch (error) {
    if(error.status)
      return res.status(error.status).json(helpers.sendError(error.message, error.status)) 
  }
}