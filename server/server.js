var net = require("net");
var util = require("util");
var PORT = 4652;

var LED_PORT = 1234;
var sock = require("../server/socket")({port: LED_PORT});

var server = net.createServer(function(c) { //'connection' listener
  c.on('end', function() {
    console.log("closed");
  });
  c.on("data", function(data) {
    var json = JSON.parse(data);
    if (json.mode == "HEX_ARRAY") {
      sock.write_hex_array(json.data);
    } else if (json.mode == "RGB_ARRAY") {
      sock.write_rgb_array(json.data);
    }
    else {
      sock.write(json.data);
    }
  });
});
server.listen(PORT, function() { //'listening' listener
  console.log('server bound to ' + PORT);
});
