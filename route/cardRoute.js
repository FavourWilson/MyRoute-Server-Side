const express = require("express");
const { createCard, getAllCards, getOneCard, updateCard } = require("../controller/card-controller");

const Router = express.Router();

// define card routes to handle HTTP request 

Router.route("/").post(createCard).get(getAllCards);
Router.route("/:id").get(getOneCard).patch(updateCard);

module.exports = Router;
