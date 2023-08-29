const userServices = require("../services/user-services");
const helpers = require("../helpers");
const mailer = require("../mailer");
const appError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

// handle user login
exports.login = catchAsync(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const user = await userServices.loginUser(email, password);

    if(!user.hasOwnProperty("oldUser") && !user.hasOwnProperty("isPasswordCorrect")) return helpers.createSendToken(res, 200, user);  
    if(user.oldUser == false) return res.status(404).json(helpers.sendError("User doesn't exist", 404));
    if(user.isPasswordCorrect == false) return res.status(400).json(helpers.sendError("Invalid credentials", 400));

  } catch (error) {
    return next(new appError(error.toString(), 500));
  }
});

// Handle user signup
exports.signUp = catchAsync(async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, gender, password, ninDocument } = req.body;
    
    const user = await userServices.createUser(firstName, lastName, email, phone, gender, password, ninDocument);
    if (user.oldUser) return res.status(403).json(helpers.sendError("User already exist", 403));

    helpers.createSendToken(res, 201, user.newUser);

    mailer.sendVerificationCode(email, "Verify your account", {
      name: firstName,
      verificationCode: user.registeredOTP,
    });
  } catch (error) {
    return next(new appError(error.toString(), 500));
  }
});

// Handle user forget password
exports.forgetPassword = async (req, res) => {
  try {
    const { email, clientURL } = req.body;

    const user = await userServices.forgotPassword(email);
    const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;

    mailer.forgetPasswordMail(user.email, "Password Reset Request", { link, name: user.firstName});

    res.status(200).json(helpers.sendSuccess("message sent successfully, check your mail", 200));
  } catch (err) {
    console.log(err);
  }
};

// Handle user password reset
exports.resetPassword = async (req, res) => {
  try {
    const { email, token, password } = req.body;

    const user = await userServices.resetPassword(email, token, password);
    resetPasswordMail(user.email, "Password Reset Successfully", { name: user.firstName });

    await passwordResetToken.deleteOne();
    res.status(200).json({ message: "Password reset was successful" });
  } catch (err) {
    console.log(err);
  }
};

// Handle verify user
exports.verifyUser = async (req, res) => {
  const { email, OTP } = req.body;

  try {
    await userServices.verifyUser(email, OTP);
  } catch (error) {
    console.log(error);
  }
};

// Handle resend verification code
exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const resendOTP = await userServices.resendOtp(email)

    mailer.sendVerificationCode(resendOTP.user.email, "Verify your account", {
      name: resendOTP.user.firstName,
      verificationCode: resendOTP.OTPCode,
    });

    res.status(200).json(helpers.sendSuccess("verification code sent", 200));
  } catch (err) {
    console.log(err);
  }
};

// Handle user account update
exports.updateAccount = async (req, res) => {
  const { email, profilePic } = req.body;

  // find user account
  await userServices.updateAccount(email, profilePic, "update-profile-image")
};