var express = require('express');
var app = express();
var path = require("path");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set("x-powered-by", false);

app.use(express.static(__dirname + '/public'));

app.locals.basedir = path.join(__dirname, 'views');

app.get('/', function (req, res) {
  res.render("index");
});

app.listen(3000);
console.log("listening on 3000");

module.exports = app;