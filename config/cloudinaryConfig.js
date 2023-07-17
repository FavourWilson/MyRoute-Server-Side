const cloudinary = require("cloudinary").v2;
const uploader = require("cloudinary").v2;
import dotenv from 'dotenv';
dotenv.config()
const cloudinaryConfig = (req, res, next) => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    })
    next();
};

module.exports =  { cloudinaryConfig, uploader };