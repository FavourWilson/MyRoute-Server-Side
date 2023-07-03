const express = require("express");

const {
	createDriver,
	
} = require("../controller/driverController");
const Router = express.Router();

Router.route("/").post(createDriver);

module.exports = Router;  
