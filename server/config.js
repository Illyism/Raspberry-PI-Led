var _ = require("lodash");
var config = {
	host: process.env.HOST,
	port: process.env.PORT,
	socket: {
		host: process.env.SOCKET_HOST,
		port: process.env.SOCKET_PORT
	},
	led: {
		count: process.env.LED_COUNT,
		automatic: process.env.LED_AUTOMATIC
	}
};

_.defaults(config, {
	// Server configuration

	host: "localhost",
	port: 4652
});

_.defaults(config.socket, {
	// LED socket configuration

	host: "172.23.49.0",
	port: 4561
});

_.defaults(config.led, {
	// LED configuration

	count: 10,
	color: "FFFFFF",
	automatic: true
});


console.log(config);
module.exports = config;