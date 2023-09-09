const express = require("express");
const {
  login,
  signUp,
  verifyOTP,
  resendOTP,
  forgetPassword,
  resetPassword,
  updateAccount,
  userBooking,
  deleteUser,
  bookDriver
} = require("../controller/user-controller");

const Router = express.Router();

Router.route("/login").post(login);
Router.route("/signup").post(signUp);
Router.route("/verify-user").post(verifyOTP);
Router.route("/resend-code").post(resendOTP);
Router.route("/forget-password").post(forgetPassword);
Router.route("/reset-password").post(resetPassword);
Router.route("/update-account").patch(updateAccount);
Router.route("/save-booking").patch(userBooking);
Router.route("/book-driver").patch(bookDriver);
Router.route("/delete-account/:email").delete(deleteUser);

module.exports = Router;