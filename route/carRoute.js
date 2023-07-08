const express = require("express");

const {
	createCar,
	getAllCars,
	getOneCar,
	updateCar,
} = require("../controller/carController");
const Router = express.Router();

Router.route("/").post(createCar).get(getAllCars);
Router.route("/:id").get(getOneCar).patch(updateCar);

module.exports = Router;