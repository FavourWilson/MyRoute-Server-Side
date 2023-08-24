const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { forgetPasswordMail } = require("../utils/nodemailer/forgetPassword");
const { resetPasswordMail } = require("../utils/nodemailer/resetPassword");
const { sendVerificationCode } = require("../utils/nodemailer/verification");
const handleImgUpload = require("../utils/cloudinary/cloudinary");
const appError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");
const { promisify } = require("util");

// modals
const Token = require("../models/tokenModel");
const User = require("../models/userModel");
const CodeVerification = require("../models/codeVerificationModel");

const bcryptSalt = process.env.BCRYPT_SALT;

// send a token to the client
const createSendToken = (res, status, user) => {
  try {
    // create token in nodeJs
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TOKEN_EXPIRES,
    });

    const cookieOptions = {
      expires: new Date(
        Date.now() +
          Number(process.env.JWT_COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: false,
    };

    // send a cookie as a response
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
    res.cookie("SESSIONID", token, cookieOptions);
    res.status(status).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error,
    });
  }
};

// Handle user login
exports.login = catchAsync(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if user account is present
    const oldUser = await User.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    // compare password
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    createSendToken(res, 200, oldUser);
  } catch (error) {
    return next(new appError(error.toString(), 500));
  }
});

// Handle user signup




exports.signUp = catchAsync(async (req, res, next) => {

 
  try {
    const { firstName, lastName, email, phone, gender, password, ninDocument } =
      req.body;

    // check user account
    const oldUser = await User.findOne({ email });
    if (oldUser) return res.status(403).json({ message: "User already exist" });

    const verificationCode = Math.floor(Math.random() * (123456, 789012));

    // upload nin to cloudinary and create account
    handleImgUpload(ninDocument)
      .then(async (nin) => {
        const user = await User.create({
          firstName,
          lastName,
          email,
          phone,
          gender,
          password,
          ninDocument: nin.secure_url,
        });

        await new CodeVerification({
          email: email,
          verificationCode: verificationCode,
          createdAt: Date.now(),
        }).save();

        if (user) {
          createSendToken(res, 201, user);
          sendVerificationCode(email, "Verify your account", {
            name: firstName,
            verificationCode: verificationCode,
          });
        }
      })
      .catch((err) => res.status(400).json({ err }));
  } catch (error) {
    return next(new appError(error.toString(), 500));
  }
});

// Handle user authentication
exports.authProtect = catchAsync(async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.SESSIONID) token = req.cookies.SESSIONID;
    if (!token)
      return next(
        new appError("you are not logged in, Please login to get access")
      );

    const validate = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const { id } = validate;
    const user = await User.findById(id);
    if (!user)
      return next(
        new appError(
          "The user belonging to this token does no longer exist",
          401
        )
      );

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ err });
  }
});

// Handle user forget password
exports.forgetPassword = async (req, res) => {
  try {
    const { email, clientURL } = req.body;

    // chek validity of the token
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("Email does not exist");

    let token = await Token.findOne({ email });
    if (token) await Token.deleteOne();

    // implementing a reset token and hashing it using bcrypt
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(process.env.BCRYPT_SALT));

    await new Token({
      email,
      token: hash,
      createdAt: Date.now(),
    }).save();

    const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;

    // send the email for a password reset
    forgetPasswordMail(user.email, "Password Reset Request", {
      link: link,
      name: user.firstName,
    });

    res.status(200).json({ message: "sent successfully" });
  } catch (err) {
    console.log(err);
  }
};

// Handle user password reset
exports.resetPassword = async (req, res) => {
  const { email, token, password } = req.body;

  // check validity of the token
  let passwordResetToken = await Token.findOne({ email });
  if (!passwordResetToken)
    return res
      .status(404)
      .json({ message: "Invalid or expired password reset token" });

  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid)
    return res
      .status(404)
      .json({ message: "Invalid or expired password reset token" });

  // hash the new password
  const hash = await bcrypt.hash(password, Number(bcryptSalt));

  await User.updateOne(
    { email: email },
    { $set: { password: hash } },
    { new: true }
  );

  // find user by ID and send mail
  const user = await User.findOne({ email });
  resetPasswordMail(user.email, "Password Reset Successfully", {
    name: user.firstName,
  });

  // delete password reset token
  await passwordResetToken.deleteOne();
  res.status(200).json({ message: "Password reset was successful" });
};

// Handle verify user
exports.verifyUser = async (req, res) => {
  const { email, verificationCode } = req.body;

  try {
    // find user by email
    const user = await User.findOne({ email });
    if (!user) throw new Error("User does not exist");

    // check if codeVerification is valid
    let codeVerification = await CodeVerification.findOne({ email });
    if (!codeVerification)
      return res
        .status(404)
        .json({ message: "Invalid or expired verification code" });


    if (verificationCode !== codeVerification.verificationCode)
      return res.status(400).json({ message: "Not successfully verified" });

    // verify the code and make user account active
    res
      .status(200)
      .json({ message: "Verification code successfully verified" });

    await User.updateOne(
      { email: email },
      { $set: { isActive: true } },
      { new: true }
    );

    // delete the current code verification
    await codeVerification.deleteOne();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Handle resend verification code
exports.resendCode = async (req, res) => {
  try {
    const { email } = req.body;

    // create verification code
    const verificationCode = Math.floor(Math.random() * (123456, 789012));

    // find user and code verification
    const user = await User.findOne({ email });
    if (!user) throw new Error("User does not exist");

    let token = await CodeVerification.findOne({ email });
    if (token) await token.deleteOne();

    // create verification code
    await new CodeVerification({
      email: email,
      verificationCode: verificationCode,
      createdAt: Date.now(),
    }).save();

    sendVerificationCode(user.email, "Verify your account", {
      name: user.firstName,
      verificationCode: verificationCode,
    });

    res.status(200).json({ message: "verification code sent" });
  } catch (err) {
    console.log(err);
  }
};

// Handle user account update
exports.updateAccount = async (req, res) => {
  const { email, profilePic } = req.body;

  // find user account
  const userDetails = await User.findOne({ email });

  if (profilePic) {
    // upload profile pic
    handleImgUpload(profilePic).then(async (profilePicture) => {
      await User.updateOne(
        { email: email },
        { $set: { profilePic: profilePicture.secure_url } },
        { new: true }
      );

      // send userDetails
      res
        .status(200)
        .json({
          message: "profile picture has been successfully updated",
          userDetails,
        });
    });
  }
};
