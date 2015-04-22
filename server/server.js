var net = require("net");
var util = require("util");
var PORT = 4654;


var server = net.createServer(function(c) { //'connection' listener
  console.log('client connected');
  c.on('end', function() {
    console.log('client disconnected');
  });
  c.write('hello\r\n');
  c.pipe(c);
});
server.listen(PORT, function() { //'listening' listener
  console.log('server bound to ' + PORT);
});
