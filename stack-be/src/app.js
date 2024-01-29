var http = require("http");
require("dotenv").config();
var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const { Server } = require("socket.io");
require("module-alias/register");
const mongoose = require("mongoose");
const typeDefs = require("@schemas");
const resolvers = require("@resolvers");
let port = process.env.NODE_ENV === "development" ? process.env.PORT_DEV : process.env.PORT_PRODUCTION;
let host = process.env.NODE_ENV === "development" ? process.env.DB_HOST_DEV : process.env.DB_HOST_PRODUCTION;
let username = process.env.DB_USERNAME;
let password = process.env.DB_PASSWORD;
let dbPort = process.env.DB_PORT;
let dbName = process.env.DB_NAME;
let mongodbStr = `mongodb://${username}:${password}@${host}:${dbPort}/${dbName}`;
global.__IMAGES = path.join(__dirname, "public/images");
global.__DOCUMENTS = path.join(__dirname, "public/documents");
let db = null;
const mongooseConnect = async () => {
	await mongoose.connect(mongodbStr, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
	db = mongoose.connection;
	db.on("error", () => {
		console.log("Connection fail");
	});
	db.once("open", () => {
		console.log("Connected");
	});
};
mongooseConnect();
var app = express();
app.use("/", express.static("src/public"));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.set("port", port);
var serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
	cors: { origin: "*" }
});
let serverApollo = null;
const serverApolloStart = async () => {
	serverApollo = new ApolloServer({
		typeDefs,
		resolvers
	});
	await serverApollo.start();
	serverApollo.applyMiddleware({ app });
};
serverApolloStart();
serverHttp.listen(port);
