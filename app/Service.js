function Service(config) {
	this.config = config;
}

Service.prototype.start = function () {
	var express = require('express');
	var server = express();

	console.log("Config: " + JSON.stringify(this.config, null, 2));

	server.listen(this.config.port);
};

module.exports = Service;
