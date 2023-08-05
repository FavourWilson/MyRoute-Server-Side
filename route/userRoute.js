const express = require("express");
const { login, signUp } = require("../controller/userController");

const Router = express.Router();

// define user routes to handle HTTP request
Router.route("/login").post(login);
Router.route("/signup").post(signUp);

module.exports = Router;