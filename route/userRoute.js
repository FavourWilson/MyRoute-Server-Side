const express = require("express");
const { login, signUp,createSendToken } = require("../controller/userController");

const Router = express.Router();

Router.route("/login").post(login);
Router.route("/signup").post(signUp);
Router.route("/createSendToken").post(createSendToken);

module.exports = Router;