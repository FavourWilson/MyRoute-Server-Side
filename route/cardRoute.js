const express = require("express");
const { createCard, getAllCards, getOneCard, updateCard } = require("../controller/card-controller");

const Router = express.Router();

// define card routes to handle HTTP request 
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - userId
 *         - CVV
 *         - expiryDate
 *         - secureCode
 *       properties:
 *         userId:
 *           type: string
 *         CVV:
 *           type: string
 *         expiryDate:
 *           type: string
 *         secureCode:
 *           type: string
 *         example:
*            userId: 
*            CVV:  7464678399393
*            expiryDate:  9/25
*            secureCode:  4567
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Add user card
 * /api/v1/cards:
 *   post:
 *     summary: Add a user debit card
 *     tags: [createCard]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Card added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Some server error
 *
 */
Router.route("/").post(createCard).get(getAllCards);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         userId:
 *           type: email
 *         example:
*            email:  Add user email
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Add user card
 * /api/v1/cards:
 *   post:
 *     summary: Add a user debit card
 *     tags: [createCard]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Card added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Some server error
 *
 */


Router.route("/:email").get(getOneCard).patch(updateCard);

module.exports = Router;
