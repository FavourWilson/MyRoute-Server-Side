const express = require("express");
const { createCar, getAllCars, getOneCar, updateCar} = require("../controller/carController");

const Router = express.Router();

// define car routes to handle HTTP request
/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - referralCode
 *         - vehicleManfac
 *         - vehicleModel
 *         - vehicleYear
 *         - carLicenseNo
 *         - vehicleColor
 *         - userId
 *       properties:
 *         referralCode:
 *           type: string
 *         vehicleManfac:
 *           type: string
 *         vehicleModel:
 *           type: string
 *         vehicleYear:
 *           type: string
 *         carLicenseNo:
 *           type: string
 *         vehicleColor:
 *           type: string
 *         userId:
 *           type: string
 *       example:
 *         referralCode: 09098
 *         vehicleManfac: Toyota
 *         vehicleModel: 2017
 *         vehicleYear: 2017
 *         carLicenseNo: ASDFR555GHT
 *         vehicleColor: black
 *         userId: asd5lopui67bnmj
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The signup new users
 * /api/v1/cars/id:
 *   put:
 *     summary: Update car details
 *     tags: [Car]
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


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Get all the cars
 * /api/v1/cars:
 *   get:
 *     summary: Get all users cars
 *     tags: [Car]
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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Create new cars
 * /api/v1/cars/id:
 *   get:
 *     summary: Get a user car base on id
 *     tags: [Car]
 *     parameters:
 *       - in: path
 *         name:
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
Router.route("/").post(createCar).get(getAllCars);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Create new cars
 * /api/v1/cars:
 *   post:
 *     summary: Create new cars
 *     tags: [Car]
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

Router.route("/:id").get(getOneCar).patch(updateCar);

module.exports = Router;