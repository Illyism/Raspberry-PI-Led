var net = require("net");
var BitArray = require('node-bitarray');
var _ = require("lodash");

module.exports = function(opt) {

  var client = new net.Socket();
  client.connect(opt.port || "4561", opt.host || "localhost", function() {
   console.log("connected");
  });

  client.on("data", function(data) {
    console.log("Rx: ", data.toString());
  });

  client.on("close", function() {
   console.log("Closed");       
  });


  function write_hex_array(arr) {
    var buf = _(arr)
      .map(function(c) {
        return parseInt(c, 16);
      })
      .map(BitArray.parse)
      .map(function(b) {
        return b.join("");
      })
      .join("");
    client.write(buf);
  }

  function write_rgb_array(arr) {
    var buf = arr
      .map(function(c) {
        return c
          .map(BitArray.factory)
          .map(String)
          .join("");
      })
      .join("");
    client.write(buf);
  }

  var write = console.log;

  if (opt.mode == "HEX_ARRAY") {
    write = write_hex_array;
  } else if (opt.mode == "RGB_ARRAY") {
    write = write_rgb_array;
  }

  return {
    write_hex_array: write_hex_array,
    write_rgb_array: write_rgb_array,
    write: write
  };
};