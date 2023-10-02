const express = require("express");
const {createDriver, saveDriverBooking} = require("../controller/driver-controller");

const Router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - userId
 *         - pickupLocation
 *         - dropOffLocation
 *         - whereAreyouGoing
 *         - whenAreyouGoing
 *         - seatsAvailable
 *         - currentMapLocation
 *         - destination 
 *         - whatRouteAreYouPassing
 *         - whatTimeAreYouGoing
 *         - price
 *         - paymentMethod
 *       properties:
 *         userId:
 *           type: string
 *         pickupLocation:
 *           type: string
 *         dropOffLocation:
 *           type: string
 *         whereAreyouGoing:
 *           type: string
 *         seatsAvailable:
 *           type: string
 *         currentMapLocation:
 *           type: string
 *         destination:
 *           type: string
 *         whatRouteAreYouPassing:
 *           type: string
 *         whatTimeAreYouGoing:
 *           type: string
 *         price:
 *           type: Number
 *         paymentMethod:
 *           type: string
 *         example:
*            userId: AlexDewdney@gmail.com
*            pickUpLocation: ikeja
*            dropOffLocation: cms
*            whenAreyouGoing:  Morning
*            seatsAvailable:  3 seats
*            currentMapLocation:  Mile 2
*            destination: lekki phase 1
*            whatRouteAreYouPassing: mile 2
*            whatTimeAreYouGoing: 4pm
*            price: 4000
*            paymentMethod: cash
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Booking driver
 * /api/v1/users/save-booking:
 *   post:
 *     summary: Booking driver
 *     tags: [save-booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Driver booking saved successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Some server error
 *
 */
Router.route("/save-booking").post(saveDriverBooking)

module.exports = Router;  
