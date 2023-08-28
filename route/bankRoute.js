const express = require("express");
const { createBank, getAllBanks,getOneBank, updateBank } = require("../controller/bank-controller");

const Router = express.Router();

// define bank routes to handle HTTP request 
Router.route("/").post(createBank).get(getAllBanks);
Router.route("/:id").get(getOneBank).patch(updateBank);

module.exports = Router;
