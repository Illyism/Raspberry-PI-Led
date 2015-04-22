var net = require("net");
var util = require("util");
var _ = require("lodash");

var client = new net.Socket();
client.connect(4652, "localhost", function() {
  console.log("connected");
});

client.on("data", function(data) {
  console.log("Rx: ", data.toString());
});

client.on("close", function() {
  console.log("Closed");       
});


var color = "FFAA00";
var colors = _.fill(_.range(10), color);



client.write(JSON.stringify({
  mode: "HEX_ARRAY",
  data: colors
}));
client.end();