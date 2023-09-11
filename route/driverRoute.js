const express = require("express");
const {createDriver, saveDriverBooking} = require("../controller/driver-controller");

const Router = express.Router();

Router.route("/save-booking").post(saveDriverBooking)

module.exports = Router;  
