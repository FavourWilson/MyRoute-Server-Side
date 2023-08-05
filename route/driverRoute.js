const express = require("express");
const {createDriver, resetPassword} = require("../controller/driverController");

const Router = express.Router();

// define driver route to handle HTTP request
Router.route("/").post(createDriver);
Router.route("/reset").post(resetPassword);

module.exports = Router;  
