const express = require("express");
const {createDriver} = require("../controller/driverController");

const Router = express.Router();

// define driver route to handle HTTP request
Router.route("/").post(createDriver);

module.exports = Router;  
