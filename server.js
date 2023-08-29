const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require("swagger-jsdoc");
const dbString = process.env.DATABASE_CONNECTION_STRING.replace(
	"<password>",
	process.env.DATABASE_CONNECTION_PASSWORD
);
const options={
	definition:{
		openapi: '3.0.0',
		info:{
			title: 'MyRoute Api',
			version:'1.0.0'
		},
		servers: [
			{
				url:'https://myroute-aqn5.onrender.com'
			}
		]
	},
	apis:['./route/*.js']
}
mongoose.set("strictQuery", false);
mongoose.connect(dbString, {
		useUnifiedTopology: true,
        useNewUrlParser: true,
        autoIndex: true
	})
	.then((conn) => console.log(conn.connection._connectionString))
	.catch((err) => console.error(err));

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
	console.log(`app is running on port ${PORT}`);
});


const swaggerSpec = swaggerJsdoc(options)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
 