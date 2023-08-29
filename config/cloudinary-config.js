const cloudinary = require("cloudinary").v2;

// import environment variable
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// upload Image to cloudinary
module.exports = async function handleUpload(file, preset) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
};
