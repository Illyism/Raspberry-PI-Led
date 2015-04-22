var net = require("net");
var BitArray = require('node-bitarray');
var _ = require("lodash");


var color = "FFFFFF";
var colors = _.fill(_.range(3*10), color);

console.log(colors);


var numbers = _(colors)
        .map(function(c) {
          return parseInt(c, 16);
        })
        .map(BitArray.parse)
        .map(function(b) {return b.join("")})
        .join("")

console.log(numbers.length);       
var client = new net.Socket();
client.connect(4561, "localhost", function() {
 console.log("connected");
 client.write(numbers);
})

client.on("data", function(data) {
  console.log("Rx: ", data);
})

client.on("close", function() {
 console.log("Closed");       
})
