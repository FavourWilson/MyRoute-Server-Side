const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const dotenv = require("dotenv");
const {requestPasswordReset, passwordReset } = require("../utils/nodemailer/resetPassword")
const appError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");
const { promisify } = require("util");
const crypto = require("crypto");

// Imported model
const User = require("../models/userModel");
const Driver = require("../models/driverModel");
const Token = require("../models/tokenModel");

dotenv.config({ path: "./config.env" });

// Cloudinary config
const cloudinary = require("../config/cloudinaryConfig");
const uploader = require("../config/cloudinaryConfig");

const bcryptSalt = process.env.BCRYPT_SALT

// Create driver API
exports.createDriver = catchAsync(async (req, res, next) => {
  try {
    const { body } = req.body;
    const data = {
      license: req.body.licensePhoto,
      outSideCar: req.body.outSideCarPhoto,
      inSideCar: req.body.inSideCarPhoto,
    };

    if (req.file) {
      const file = dataUri(req).content;
      return uploader.upload(file).then((result) => {
        const image = result.url;
        return res.status(200).json({
          messge: "Your image has been uploded successfully to cloudinary",
          data: { image },
        });
      });
    }

    // 	cloudinary.uploader.upload(data.license)
    // 	.then((result) => {
    // 	response.status(200).send({
    // 		message: "success",
    // 		result,
    // 	});
    // 	}).catch((error) => {
    // 	response.status(500).send({
    // 		message: "failure",
    // 		error,
    // 	});
    //     });

    // 	cloudinary.uploader.upload(data.outSideCar)
    // 	.then((result) => {
    // 	response.status(200).send({
    // 		message: "success",
    // 		result,
    // 	});
    // 	}).catch((error) => {
    // 	response.status(500).send({
    // 		message: "failure",
    // 		error,
    // 	});
    // 	});
    // 	cloudinary.uploader.upload(data.inSideCar)
    // 	.then((result) => {
    // 	response.status(200).send({
    // 		message: "success",
    // 		result,
    // 	});
    // 	}).catch((error) => {
    // 	response.status(500).send({
    // 		message: "failure",
    // 		error,
    // 	});
    // 	});

    // 	const driver = await Driver.create(body);
    // 	res.status(201).json({
    // 		status: "success",
    // 		data: {driver	},
    // 	});
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      error: error.toString(),
    });
  }
});

// Password resetting API for the driver
exports.requestResetPassword = async(req, res) => {
	try {
		const { email, clientURL } = req.body

    // chek validity of the token
    const driver = await Driver.findOne({ email });
    if(!driver) throw new Error("Email does not exist")
    
    let token = await Token.findOne({ userId: driver._id });
    if (token) await Token.deleteOne();

    // implementing a reset token and hashing it using bcrypt
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

    // store the token in the DB
    await new Token({
      userId: driver._id,
      token: hash,
      createdAt: Date.now(),
    }).save();

    // create a link for the password reset
    const link = `${clientURL}/passwordReset?token=${resetToken}&id=${driver._id}`;

    // send the email for a password reset
    requestPasswordReset(driver.email, "Password Reset Request", {link: link, name: driver.firstName})

    res.json({ message: "sent successfully"})

	} catch(err){
		console.log(err)
	}
}

// reset drivers password
exports.resetPassword = async ( req, res) => {
  const { userId, token, password } = req.body

  // chek validity of the token
  let passwordResetToken = await Token.findOne({ userId });
  if (!passwordResetToken) throw new Error("Invalid or expired password reset token");
    
  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) throw new Error("Invalid or expired password reset token");
  
  // hash the new password
  const hash = await bcrypt.hash(password, Number(bcryptSalt));

  // update the document and return the updated data
  await User.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true }
  );

  // find user by ID and send mail
  const user = await User.findById({ _id: userId });
  passwordReset(user.email, "Password Reset Successfully", {name: user.firstName})
  
  await passwordResetToken.deleteOne();

  res.json({ message: "Password reset was successful" })
};