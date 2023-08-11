const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// import application routes
const driverRouter = require("./route/driverRoute");
const userRouter = require("./route/userRoute");
const carRouter = require("./route/carRoute"); 
const cardRouter = require("./route/cardRoute")
const bankRouter = require("./route/bankRoute")

// import the error handling middleware
const { generalErrorHandler } = require("./utils/generalErrorHandler");

// initialize the express app
const app = express();

// parsing incoming Json data
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

// Accessing the cookies sent with the request
app.use(cookieParser());

// Enable cors middleware
app.use(cors());

// Enable logging middleware (using dev format)
app.use(morgan("dev"));

// router middleware
app.use("/api/v1/users", userRouter);
app.use("/api/v1/drivers", driverRouter);
app.use("/api/v1/banks", bankRouter);
app.use("/api/v1/cards", cardRouter);
app.use("/api/v1/cars", carRouter);

// register the error handling middleware
app.use(generalErrorHandler);

app.get("/", (req, res) => {
	res.status(200).json({
		status: "success",
		message: "it's all good baby baby",
	});
});

module.exports = app;
