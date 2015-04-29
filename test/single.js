var PORT = process.env.PORT;
var HOST = process.env.HOST;

var sock = require("../server/socket")({host: HOST, port: PORT});
var _ = require("lodash");

var color = "FFAA00";
var colors = _.fill(_.range(10), color);


sock.write_hex_array(colors);