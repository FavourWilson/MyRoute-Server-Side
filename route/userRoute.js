const express = require("express");
const { login, signUp, verifyUser, resendCode, forgetPassword, resetPassword, updateAccount } = require("../controller/userController");

const Router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         email: AlexDewdney@gmail.com
 *         password: aw2dcv56
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

// define user routes to handle HTTP request
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Access point to signin
 * /api/v1/users/login:
 *   post:
 *     summary: Login an existing user
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       201:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       400:
 *         description: Some server error
 *
 */
Router.route("/login").post(login)

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
Router.route("/signup").post(signUp)

/**
 * @swagger
 * components:
 *   schemas:
 *     CodeVerification:
 *       type: object
 *       required:
 *         - email
 *         - verifyCode
 *       properties:
 *         email:
 *           type: string
 *         verificationCode:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date
 *       example:
 *         email: AlexDewdney@gmail.com
 *         verificationCode: 555664
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The signup new users
 * /api/v1/users/verify-user:
 *   post:
 *     summary: Verify a user email
 *     tags: [Verify User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CodeVerification'
 *     responses:
 *       201:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CodeVerification'
 *       400:
 *         description: Some server error
 *
 */
Router.route("/verify-user").post(verifyUser)


/**
 * @swagger
 * components:
 *   schemas:
 *     CodeVerification:
 *       type: object
 *       required:
 *         - email
 *         - verifyCode
 *       properties:
 *         email:
 *           type: string
 *         verificationCode:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date
 *       example:
 *         email: AlexDewdney@gmail.com
 *         verificationCode: 555664
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The signup new users
 * /api/v1/users/resend-code:
 *   post:
 *     summary: resending verifying code to a user
 *     tags: [Resend Code]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CodeVerification'
 *     responses:
 *       201:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CodeVerification'
 *       400:
 *         description: Some server error
 *
 */
Router.route("/resend-code").post(resendCode)

/**
 * @swagger
 * components:
 *   schemas:
 *     ForgetPassword:
 *       type: object
 *       required:
 *         - email
 *         - clientURL
 *       properties:
 *         email:
 *           type: string
 *         clientURL:
 *           type: string
 *       example:
 *         email: AlexDewdney@gmail.com
 *         clientURL: 555664
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The signup new users
 * /api/v1/users/forget-password:
 *   post:
 *     summary: Get link for your password
 *     tags: [forgetPassword]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgetPassword'
 *     responses:
 *       201:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForgetPassword'
 *       400:
 *         description: Some server error
 *
 */
Router.route("/forget-password").post(forgetPassword)
/**
 * @swagger
 * components:
 *   schemas:
 *     ResetPassword:
 *       type: object
 *       required:
 *         - email
 *         - token
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         token:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         email: AlexDewdney@gmail.com
 *         token: 555664
 *         password: AlexDew@664
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The signup new users
 * /api/v1/users/reset-password:
 *   post:
 *     summary: Get link for your password
 *     tags: [resetPassword]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPassword'
 *     responses:
 *       201:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResetPassword'
 *       400:
 *         description: Some server error
 *
 */
Router.route("/reset-password").post(resetPassword)

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateAccount:
 *       type: object
 *       required:
 *         - email
 *         - profilePic
 *       properties:
 *         email:
 *           type: string
 *         profilePic:
 *           type: string
 *       example:
 *         email: AlexDewdney@gmail.com
 *         profilePic: 555664
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The signup new users
 * /api/v1/users/update-account:
 *   put:
 *     summary: Get link for your password
 *     tags: [UpdateAccount]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAccount'
 *     responses:
 *       201:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateAccount'
 *       400:
 *         description: Some server error
 *
 */
Router.route("/update-account").patch(updateAccount)

module.exports = Router;