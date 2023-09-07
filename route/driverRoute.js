const express = require("express");
const {createDriver, driverBooking} = require("../controller/driver-controller");

const Router = express.Router();

Router.route("/").post(createDriver);
Router.route("/driver-booking").post(driverBooking)

module.exports = Router;  
