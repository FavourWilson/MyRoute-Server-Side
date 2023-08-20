const express = require("express");
const { createCard, getAllCards, getOneCard, updateCard } = require("../controller/cardController");

const Router = express.Router();

// define card routes to handle HTTP request 

/**
 * @swagger
 * components:
 *   schemas:
 *     Card:
 *       type: object
 *       properties:
 *         CardNo:
 *           type: string
 *         ExpiryDate:
 *           type: string
 *         SecureCode:
 *           type: number
 *         userId:
 *           type: string
 *       example:
 *         CardNo: 2246609098
 *         ExpiryDate: 20225
 *         SecureCode: 0790
 *         userId: asd5lopui67bnmj
 */




/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Get all the cars
 * /api/v1/cards:
 *   post:
 *     summary: List of all users card
 *     tags: [Card]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Card'
 *     responses:
 *       201:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       400:
 *         description: Some server error
 *
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Get all the cars
 * /api/v1/cards:
 *   get:
 *     summary: List of all users card
 *     tags: [Card]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Card'
 *     responses:
 *       201:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       400:
 *         description: Some server error
 *
 */


Router.route("/").post(createCard).get(getAllCards);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The signup new users
 * /api/v1/cards/id:
 *   put:
 *     summary: Update card details
 *     tags: [Card]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Card'
 *     responses:
 *       201:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       400:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: List of a user card
 * /api/v1/cards/id:
 *   get:
 *     summary: Get a user car base on id
 *     tags: [Card]
 *     parameters:
 *       - in: path
 *         name: id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       201:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       400:
 *         description: Some server error
 *
 */
Router.route("/:id").get(getOneCard).patch(updateCard);

module.exports = Router;
