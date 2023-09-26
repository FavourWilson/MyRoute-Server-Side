const express = require("express");
const {createDriver, saveDriverBooking} = require("../controller/driver-controller");

const Router = express.Router();

/**
 * 
 * @swagger
 * components:
 *   schemas:
 *    Save-Booking:
 *      type:object
 *      required:
 *        - pickupLocation
 *        - dropOffLocation
 *        - whenAreyouGoing
 *        - seatsAvailable
 *        - currentMapLocation
 *        - destination
 *        - whatRouteAreYouPassing
 *        - whatTimeAreYouGoing
 *        - price
 *        - paymentMethod
 *      properties:
 *        - pickupLocation:
 *           type: string
 *        - dropOffLocation:
 *           type: string
 *        - whenAreyouGoing:
 *           type: string
 *        - whenAreyouGoing:
 *           type: string
 *        - seatsAvailable:
 *           type: string
 *        - currentMapLocation:
 *           type: string
 *        - destination:
 *           type: string
 *        - whatRouteAreYouPassing:
 *           type: string
 *        - price:
 *           type: string
 *        - paymentMethod:
 *           type: string
 *      example:
 *        pickupLocation: okoko
 *        dropOffLocation: Surulere
 *        whenAreyouGoing: 20/09/2023 
 *        seatsAvailable: 3 seats
 *        currentMapLocation: Okoko junction
 *        destination: CMS
 *        whatRouteAreYouPassing: first stack
 *        price: 3000
 *        paymentMethod: Cash
 */
Router.route("/save-booking").post(saveDriverBooking)

module.exports = Router;  
