const express = require("express");
const { createBank, getAllBanks,getOneBank, updateBank } = require("../controller/bank-controller");

const Router = express.Router();

// define bank routes to handle HTTP request

/**
 * 
 * @swagger
 * components:
 *   schemas:
 *    create-Bank:
 *      type:object
 *      required:
 *        - bankName
 *        - acctName
 *        - acctNo
 *        - userId
 *      properties:
 *        - bankName:
 *           type: string
 *        - acctName:
 *           type: string
 *        - acctNo:
 *           type: string
 *        - UserId:
 *           type: string
 *      example:
 *        bankName: UBA
 *        acctName: Alex Dwen
 *        acctNo: 2235661245
 *        UserId: 64fa02fc63c7104dd7d50595
 */
Router.route("/").post(createBank).get(getAllBanks);
Router.route("/:id").get(getOneBank).patch(updateBank);

module.exports = Router;
