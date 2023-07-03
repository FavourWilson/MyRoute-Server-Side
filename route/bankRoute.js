const express = require("express");

const {
	createBank,
	getAllBanks,
	getOneBank,
	updateBank,
} = require("../controller/bankController");
const Router = express.Router();

Router.route("/").post(createBank).get(getAllBanks);
Router.route("/:id").get(getOneBank).patch(updateBank);

module.exports = Router;
