var config = require("./config");
var sock = require("./socket")(config.socket);
var _ = require("lodash");
var converter = require("color-convert")();


function Led(id) {
	this.id = id;
	this.color = config.led.color;
}

Led.prototype.setHexColor = function(hex) {
	this.color = hex;
	return this;
}

Led.prototype.setRGBColor = function(rgbObj) {
	this.state.r = rgbObj.r;
	this.state.g = rgbObj.g;
	this.state.b = rgbObj.b;
	return this;
}

Led.prototype.toString = function() {
	return "Led";
}


// Collection of Led
function Leds() {
	var self = this;
	this.config = config;
	this.length = config.led.count;
	this.leds = [];
	this.automatic = config.led.automatic;

	for (var i = 0; i < this.length; i ++) {
		this.leds.push(new Led(i));
	}


	var commitInterval;

	if (this.automatic === true) {
	  commitInterval = setInterval(function() {
	    self.commit();
	  }, 100);
	}

	this.setAutomatic = function(b) {
		self.automatic = b;
		commitInterval = clearInterval(commitInterval);
		if (self.automatic === true) {
			commitInterval = setInterval(function() {
			  self.commit();
			}, 100);
		}
		
	}

}

Leds.prototype.reflect = function() {
	return this;
}

Leds.prototype.get = function(i) {
	return this.leds[i];
}

Leds.prototype.getColors = function() {
	return _.pluck(this.leds, "color");
}

Leds.prototype.commit = function() {
	return sock.write_hex_array(this.getColors());
}

module.exports = new Leds();