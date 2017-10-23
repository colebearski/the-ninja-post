// Dependanices
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
var exphbs = require("express-handlebars");

// Require our Article Models


// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

// Set Mongoose to handle built in JS ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
var app = express();
var PORT = process.env.PORT || 4000;

// Use Morgan and Body Parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
	extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Fire up HandleBars for views
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Database configuration with Mongoose
// mongoose.connect("mongodb:")
// var db = mongoose.connection;

// Disply any Mongoose errors
// db.on("error", function(error) {
//	console.log("Mongoose connection succesful.");
// });

// Require our Hot Routes
require("./app/routing/htmlRoutes.js")(app);

// Import Routes and provide access
// var router = require("./controllers/xxxxxx");
// app.use("/", router);

// Listen on Port 4000
app.listen(4000, function() {
	console.log("App running on port 4000!");
});
