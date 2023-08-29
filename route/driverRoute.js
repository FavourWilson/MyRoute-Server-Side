const express = require("express");
const {createDriver} = require("../controller/driver-controller");

const Router = express.Router();

// define driver route to handle HTTP request

/**
 * @swagger
 * components:
 *   schemas:
 *     Driver:
 *       type: object
 *       required:
 *         - user_Id
 *         - referral_code
 *         - vehicle_Manufacturer
 *         - vehicle_Model
 *         - vehicle_year
 *         - plate_number_license
 *         - driver_license_number
 *         - driver_license
 *         - driver_license_expiry_Date
 *         - outSide_Car_Photo
 *         - inSide_Car_Photo
 *         - address
 *         - bank_account_holder_name
 *         - bank_account_number
 *         - bank_name
 *       properties:
 *         user_Id:
 *           type: string
 *         referral_Code:
 *           type: string
 *         vehicle_Manufacturer:
 *           type: string
 *         vehicle_Model:
 *           type: string
 *         vehicle_year:
 *           type: string
 *         plate_number_license:
 *           type: string
 *         driver_license_number:
 *           type: string
 *         driver_license_expiry_Date:
 *           type: string
 *         outSide_Car_Photo:
 *           type: string
 *         inSide_Car_Photo:
 *           type: string
 *         address:
 *           type: string
 *         bank_account_holder_name:
 *           type: string
 *         bank_account_number:
 *           type: string
 *         bank_name:
 *           type: string
 *       example:
 *         user_Id: 4tr3dfcv88opjf312
 *         referral_Code: 555664
 *         vehicle_Manufacturer: Corrola
 *         vehicle_Model: GH787Y
 *         vehicle_year: 2018
 *         plate_number_license: D55GH56
 *         driver_license_number: AKG5556
 *         driver_license: John Collion
 *         driver_license_expiry_Date: 2024
 *         outSide_Car_Photo: 555664
 *         inSide_Car_Photo: 555664
 *         address: christen Avenue, off Airport road
 *         bank_account_holder_name: John Collion
 *         bank_account_number: 2022319065
 *         bank_name: UBA
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The signup new users
 * /api/v1/drivers:
 *   post:
 *     summary: Get link for your password
 *     tags: [Driver]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Driver'
 *     responses:
 *       201:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Driver'
 *       400:
 *         description: Some server error
 *
 */
Router.route("/").post(createDriver);

module.exports = Router;  
