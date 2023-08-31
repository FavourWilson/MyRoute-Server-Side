const userServices = require("../services/user-services");
const helpers = require("../helpers");
const mailer = require("../mailer");
const { catchAsync } = require("../utils/catchAsync");

// handle user login
exports.login = catchAsync(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userServices.loginUser(email, password);

    if (!user.hasOwnProperty("oldUser") && !user.hasOwnProperty("isPasswordCorrect"))
      return helpers.createSendToken(res, 200, user);

    if (user.oldUser == false)
      return res.status(404).json(helpers.sendError("User doesn't exist", 404));

    if (user.isPasswordCorrect == false)
      return res.status(400).json(helpers.sendError("Invalid credentials", 400));

  } catch (error) {
    return console.log(`login Error,${error}`)
  }
});

// Handle user signup
exports.signUp = catchAsync(async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, gender, password, ninDocument } = req.body;

    const user = await userServices.createUser( firstName, lastName, email, phone, gender, password, ninDocument);
    if (user.oldUser)
      return res.status(403).json(helpers.sendError("User already exist", 403));

    helpers.createSendToken(res, 201, user.newUser);

    mailer.sendVerificationCode(email, "Verify your account", {
      name: firstName,
      verificationCode: user.registeredOTP,
    });
  } catch (error) {
    return console.log(`signup Error,${error} `)
  }
});

// Handle user forget password
exports.forgetPassword = async (req, res) => {
  try {
    const { email, clientURL } = req.body;

    const user = await userServices.forgotPassword(email);
    const link = `${clientURL}/passwordReset?token=${user.resetOTP}&id=${user.userInfo._id}`;

    mailer.forgetPasswordMail(user.userInfo.email, "Password Reset Request", {
      link,
      name: user.userInfo.firstName,
    });
    res.status(200).json(helpers.sendSuccess("message sent successfully, check your mail", 200));
  } catch (err) {
    console.log(err);
  }
};

// Handle user password reset
exports.resetPassword = async (req, res) => {
  try {
    const { email, OTP, password } = req.body;

    const user = await userServices.resetPassword(email, OTP, password);
    if (user.message == "Invalid or expired password reset token")
      return res.status(404).json(helpers.sendError("Invalid or expired password reset token", 404));

    mailer.resetPasswordMail(user.email, "Password Reset Successfully", { name: user.firstName });
    res.status(200).json({ message: "Password reset was successful" });
  } catch (err) {
    console.log(err);
  }
};

// Handle verify user
exports.verifyOTP = async (req, res) => {
  const { email, OTP } = req.body;

  try {
    const userOTPVerification = await userServices.verifyUser(email, OTP);

    if (!userOTPVerification.message == "OTP successfully verified")
      return res.status(200).json(helpers.sendSuccess("OTP successfully verified", 200));

    if (userOTPVerification.message == "User does not exist")
      return res.status(404).json(helpers.sendError("User does not exist", 404));

    if (userOTPVerification.message == "Not successfully verified")
      return res.status(400).json(helpers.sendError("Not successfully verified", 400));

    if (userOTPVerification.message == "Invalid or expired verification code")
      return res.status(400).json(helpers.sendError("Invalid or expired verification code", 404));
  } catch (error) {
    console.log(error);
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

    res.status(200).json(helpers.sendSuccess("verification code sent", 200));
  } catch (err) {
    console.log(err);
  }
};

// Handle user account update
exports.updateAccount = async (req, res) => {
  const updatesOnUser = await userServices.updateAccount( req.body.email, req.body);
  res.status(200).json(helpers.sendSuccess(updatesOnUser, 200));
};