const express = require("express");
const {createDriver, driverBooking} = require("../controller/driver-controller");

const Router = express.Router();

Router.route("/").post(createDriver);
Router.route("/save-booking").patch(driverBooking)

module.exports = Router;  
