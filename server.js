var express = require("express");
var logger = require("morgan");
var mongo = require("mongojs");
var axios = require("axios");

//initialize express
var app = express();

//parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//make public a static folder
app.use(express.static("public"));

app.listen(3000, function() {
    console.log("app running on port 3000");
});
