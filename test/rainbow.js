var PORT = process.env.PORT;
var HOST = process.env.HOST;

var converter = require("color-convert")();
var BitArray = require('node-bitarray');

var sock = require("../server/socket")({host: HOST, port: PORT, mode: "RGB_ARRAY"});
var _ = require("lodash");

color = converter.keyword("red").rgb();
var colors = [
  converter.hsl(10, 50, 50).rgb(),
  converter.hsl(20, 50, 50).rgb(),
  converter.hsl(30, 50, 50).rgb(),
  converter.hsl(40, 50, 50).rgb(),
  converter.hsl(50, 50, 50).rgb(),
  converter.hsl(60, 50, 50).rgb(),
  converter.hsl(70, 50, 50).rgb(),
  converter.hsl(80, 50, 50).rgb(),
  converter.hsl(90, 50, 50).rgb(),
  converter.hsl(100, 50, 50).rgb(),
];


var i = 0;
setInterval(function() {
  colors.unshift(converter.hsl(i, 50, 50).rgb());
  colors.pop();

  sock.write(colors);
  i++;
  if (i > 360) i = 0;
}, 10);