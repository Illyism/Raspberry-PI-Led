var express = require('express');
var app = express();
var path = require("path");
var Leds = require("./leds");


// Config

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set("x-powered-by", false);

app.use(express.static(__dirname + '/public'));

app.locals.basedir = path.join(__dirname, 'views');
app.locals._ = require("lodash");
app.locals.config = require("./config");



// Routes

app.get('/', function (req, res) {
	Leds.get(function(err, leds) {
  		res.render("index", {
  			Leds: leds
  		});
	})
});







// Init

app.listen(3000);
console.log("listening on 3000");

module.exports = app;