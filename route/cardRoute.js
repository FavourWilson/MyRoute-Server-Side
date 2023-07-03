const express = require("express");

const {
	createCard,
	getAllCards,
	getOneCard,
	updateCard,
} = require("../controller/cardController");
const Router = express.Router();

Router.route("/").post(createCard).get(getAllCards);
Router.route("/:id").get(getOneCard).patch(updateCard);

module.exports = Router;
