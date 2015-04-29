var config = require("./config");
var request = require('request');

var Leds = {};

Leds.get = function(callback) {
  var url = "http://" + config.host+":"+config.port+"/led";
  request(url, function (error, response, body) {
    if (error) return callback(error);

    var json = JSON.parse(body);
    if (json.code) return callback(json);

    callback(null, json);
  })
}


module.exports = Leds;