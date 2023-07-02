const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// personal modules
const driverRouter = require("./route/driverRoute");
const userRouter = require("./route/userRoute");
const carRouter = require("./route/carRoute"); 
const cardRouter = require("./route/cardRoute")
const bankRouter = require("./route/bankRoute")
const { generalErrorHandler } = require("./utils/generalErrorHandler");
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "/public")));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/drivers", driverRouter);
app.use("/api/v1/banks", bankRouter);

app.use(generalErrorHandler);
app.get("/", (req, res) => {
	res.status(200).json({
		status: "success",
		message: "it's all good baby baby",
	});
});

module.exports = app;
