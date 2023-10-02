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
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         example:
 *            email: AlexDewdney@gmail.com
 *            password: aw2dcv56
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Login into user account
 * /api/v1/users/login:
 *   post:
 *     summary: Login into user account
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Login into user account.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Some server error
 *
 */
Router.route("/login").post(login);


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - ninDocument
 *         - firstName
 *         - lastName
 *         - email
 *         - phone
 *         - gender
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         gender:
 *           type: string
 *         password:
 *           type: string
 *         isActive:
 *           type: boolean
 *         
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *         example:
*            firstName: Alexander
*            lastName:  K. Dewdney
*            email: AlexDewdney@gmail.com
*            phone:  0912222255
*            gender:  Male
*            password: aw2dcv56
*            createdAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The signup new users
 * /api/v1/users/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Some server error
 *
 */
Router.route("/signup").post(signUp);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - OTP
 *       properties:
 *         email:
 *           type: string
 *         OTP:
 *           type: string
 *         example:
*            email: AlexDewdney@gmail.com
*            OTP:  091222
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The verify user new users
 * /api/v1/users/verify-user:
 *   post:
 *     summary: The verify user new users
 *     tags: [verify-user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Some server error
 *
 */


Router.route("/verify-user").post(verifyOTP);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - OTP
 *       properties:
 *         email:
 *           type: string
 *         OTP:
 *           type: string
 *         example:
*            email: AlexDewdney@gmail.com
*            OTP:  091222
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The resend code to users
 * /api/v1/users/resend-code:
 *   post:
 *     summary: The resend code to users
 *     tags: [resend-code]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Reset code has been sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Some server error
 *
 */
Router.route("/resend-code").post(resendOTP);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - OTP
 *       properties:
 *         email:
 *           type: string
 *         OTP:
 *           type: string
 *         example:
*            email: AlexDewdney@gmail.com
*            OTP:  091222
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The forget-password for users
 * /api/v1/users/forget-password:
 *   post:
 *     summary: The forget-password for users
 *     tags: [forget-password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Email has been sent.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Some server error
 *
 */
Router.route("/forget-password").post(forgetPassword);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - OTP
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         OTP:
 *           type: string
 *         password:
 *           type: string
 *         example:
*            email: AlexDewdney@gmail.com
*            OTP:  091222
*            password:  Alex0989
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User to reset password
 * /api/v1/users/reset-password:
 *   post:
 *     summary: User to reset password
 *     tags: [reset-password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Some server error
 *
 */

Router.route("/reset-password").post(resetPassword);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - body
 *       properties:
 *         email:
 *           type: string
 *         body:
 *           type: string
 *         example:
*            email: AlexDewdney@gmail.com
*            body:  {User details}
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Update user profile
 * /api/v1/users/update-account:
 *   post:
 *     summary: Update user profile
 *     tags: [update-account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User update successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Some server error
 *
 */

Router.route("/update-account").patch(updateAccount);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - userId
 *         - whereAreyouLeavingFrom
 *         - whereAreyouGoing
 *         - whenAreyouGoing
 *         - seatsAvailable
 *         - currentMapLocation
 *         - preferredRoute
 *         - whatTimeAreYouGoing
 *       properties:
 *         userId:
 *           type: string
 *         whereAreyouLeavingFrom:
 *           type: string
 *         whereAreyouGoing:
 *           type: string
 *         whenAreyouGoing:
 *           type: string
 *         seatsAvailable:
 *           type: string
 *         currentMapLocation:
 *           type: string
 *         preferredRoute:
 *           type: string
 *         whatTimeAreYouGoing:
 *           type: string
 *         example:
*            userId: AlexDewdney@gmail.com
*            whereAreyouLeavingFrom:  berger
*            whereAreyouGoing:  mile 2
*            whenAreyouGoing:  TOday
*            seatsAvailable:  2 seats
*            currentMapLocation:  Berger
*            preferredRoute: 
*            whatTimeAreYouGoing: 4pm
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Update user profile
 * /api/v1/users/save-booking:
 *   put:
 *     summary: Update user profile
 *     tags: [save-booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User update successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Some server error
 *
 */

Router.route("/save-booking").patch(userBooking);


Router.route("/book-driver").patch(bookDriver);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *         example:
*            email: AlexDewdney@gmail.com
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Delete user account
 * /api/v1/users/delete-account/:email:
 *   delete:
 *     summary: Delete user account
 *     tags: [delete-account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User deleted successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Some server error
 *
 */
Router.route("/delete-account/:email").delete(deleteUser);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *         example:
*            email: AlexDewdney@gmail.com
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: fetch user account
 * /api/v1/users/account-info/:email:
 *   delete:
 *     summary: fetch user account
 *     tags: [account-info]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User update successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Some server error
 *
 */
Router.route("/account-info/:email").get(getUser);

module.exports = Router;