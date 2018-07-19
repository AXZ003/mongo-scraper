

var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var path = require("path");
var express = require("express");
var request = require("request"); // http calls

// Require all models
// note
var db = require("./models");

var PORT = process.env.PORT || 3000;


// Initialize Express
var app = express();


// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");



// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));


// handlebars
// app.engine("handlebars", exphbs({
//     defaultLayout: "main",
//     partialsDir: path.join(__dirname, "/views/layouts")
// }));


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var router = express.Router();

// Controllers

var router = require("./controllers/articleandnotes");
app.use(router);




// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:3000/mongoHeadlines";

// // Connect to the Mongo DB 
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI,{ useNewUrlParser: true });


// Start the server
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost: " + PORT + "!");
});
