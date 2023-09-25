const express = require("express");
const {
  login,
  signUp,
  verifyOTP,
  resendOTP,
  forgetPassword,
  resetPassword,
  updateAccount,
  userBooking,
  deleteUser,
  bookDriver,
  getUser
} = require("../controller/user-controller");

const Router = express.Router();

/**
 * 
 * @swagger
 * components:
 *   schemas:
 *    Login:
 *      type:object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        - email:
 *           type: string
 *        - password:
 *           type: string
 *      createdAt:
 *        type: string
 *        format: date
 *      example:
 *        email: AlexDwen@gmail.com
 *        password: naw12qw34
 *        createdAt: 2020-03-10T04:05:06.15TZ
 */
Router.route("/login").post(login);

/**
 * 
 * @swagger
 * components:
 *   schemas:
 *    Signup:
 *      type:object
 *      required:
 *        - ninDocument
 *        - firstName
 *        - lastName
 *        - phone
 *        - gender
 *        - email
 *        - password
 *      properties:
 *        - ninDocument:
 *           type: string
 *        - firstName:
 *           type: string
 *        - lastName:
 *           type: string
 *        - phone:
 *           type: string
 *        - gender:
 *           type: string
 *        - email:
 *           type: string
 *        - password:
 *           type: string
 *      createdAt:
 *        type: string    
 *        format: date
 *      example:
 *        firstName: Alex
 *        lastName: Dwen
 *        phone: 0913455635
 *        gender: Male
 *        email: AlexDwen@gmail.com
 *        password: naw12qw34
 *        createdAt: 2020-03-10T04:05:06.15TZ
 */

Router.route("/signup").post(signUp);


/**
 * 
 * @swagger
 * components:
 *   schemas:
 *    Verify-User:
 *      type:object
 *      required:
 *        - email
 *        - Verification Code
 *      properties:
 *        - email:
 *           type: string
 *        - verificationCode:
 *           type: string
 *      example:
 *        email: AlexDwen@gmail.com
 *        verificationCode: 334521
 */

Router.route("/verify-user").post(verifyOTP);
/**
 * 
 * @swagger
 * components:
 *   schemas:
 *    Resend-Code:
 *      type:object
 *      required:
 *        - email
 *      properties:
 *        - email:
 *           type: string
 *      example:
 *        email: AlexDwen@gmail.com
 */
Router.route("/resend-code").post(resendOTP);

/**
 * 
 * @swagger
 * components:
 *   schemas:
 *    Forget-Password:
 *      type:object
 *      required:
 *        - email
 *      properties:
 *        - email:
 *           type: string
 *      example:
 *        email: AlexDwen@gmail.com
 */
Router.route("/forget-password").post(forgetPassword);

/**
 * 
 * @swagger
 * components:
 *   schemas:
 *    Reset-Password:
 *      type:object
 *      required:
 *        - email
 *        - OTP
 *        - password
 *      properties:
 *        - email:
 *           type: string
 *        - OTP:
 *           type: string
 *        - password:
 *           type: string
 *      example:
 *        email: AlexDwen@gmail.com
 *        OTP: 334556
 *        password: AlexDwe@1324
 */
Router.route("/reset-password").post(resetPassword);
/**
 * 
 * @swagger
 * components:
 *   schemas:
 *    Update-Account:
 *      type:object
 *      required:
 *        - email
 *        - body
 *      properties:
 *        - email:
 *           type: string
 *        - body:
 *           type: string
 *      example:
 *        email: AlexDwen@gmail.com
 *        body: {User details attached to a particular user}
 */
Router.route("/update-account").patch(updateAccount);

/**
 * 
 * @swagger
 * components:
 *   schemas:
 *    Save-Booking:
 *      type:object
 *      required:
 *        - userId
 *        - whereAreyouLeavingFrom
 *        - whereAreyouGoing
 *        - whenAreyouGoing
 *        - seatsAvailable
 *        - currentMapLocation
 *        - preferredRoute
 *        - whatTimeAreYouGoing
 *      properties:
 *        - userId:
 *           type: string
 *        - whereAreyouLeavingFrom:
 *           type: string
 *        - whereAreyouGoing:
 *           type: string
 *        - whenAreyouGoing:
 *           type: string
 *        - seatsAvailable:
 *           type: string
 *        - currentMapLocation:
 *           type: string
 *        - preferredRoute:
 *           type: string
 *        - whatTimeAreYouGoing:
 *           type: string
 *      example:
 *        userId: AlexDwen@gmail.com
 *        whereAreyouLeavingFrom: okoko
 *        whereAreyouGoing: Surulere
 *        whenAreyouGoing: 20/09/2023 
 *        seatsAvailable: 3 seats
 *        currentMapLocation: Okoko junction
 *        preferredRoute: Ajegule
 *        whatTimeAreYouGoing: 4:00pm
 */
Router.route("/save-booking").patch(userBooking);

/**
 * 
 * @swagger
 * components:
 *   schemas:
 *    book-driver:
 *      type:object
 *      required:
 *        - UserId
 *        - DriverId
 *      properties:
 *        - UserId:
 *           type: string
 *        - DriverId:
 *           type: string
 *      example:
 *        UserId: 6507242114c47b51c22b06bd
 *        DriverId: 6507242114c47b51c22b06bd
 */
Router.route("/book-driver").patch(bookDriver);
/**
 * 
 * @swagger
 * components:
 *   schemas:
 *    Delete-Account:
 *      type:object
 *      required:
 *        - email
 *      properties:
 *        - email:
 *           type: string
 *      example:
 *        email:AlexDwen@gmail.com
 */
Router.route("/delete-account/:email").delete(deleteUser);

/**
 * 
 * @swagger
 * components:
 *   schemas:
 *    Account-info:
 *      type:object
 *      required:
 *        - email
 *      properties:
 *        - email:
 *           type: string
 *      example:
 *        email:AlexDwen@gmail.com
 */
Router.route("/account-info/:email").get(getUser);

module.exports = Router;