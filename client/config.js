var _ = require("lodash");
var config = {
	host: process.env.HOST,
	port: process.env.PORT,
};

_.defaults(config, {
	// Server configuration

	host: "localhost",
	port: 4652
});

console.log(config);
module.exports = config;