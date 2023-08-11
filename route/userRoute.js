const express = require("express");
const { login, signUp, verifyUser, resendCode, forgetPassword, resetPassword, updateAccount } = require("../controller/userController");

const Router = express.Router();

// define user routes to handle HTTP request
Router.route("/login").post(login);
Router.route("/signup").post(signUp);
Router.route("/verify-user").post(verifyUser)
Router.route("/resend-code").post(resendCode)
Router.route("/forget-password").post(forgetPassword)
Router.route("/reset-password").post(resetPassword)
Router.route("/update-account").patch(updateAccount)

module.exports = Router;