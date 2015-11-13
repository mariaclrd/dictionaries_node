function Service(config) {
	this.config = config;
}

Service.prototype.start = function () {
	var express = require('express');
	var server = express();
	server.listen(this.config.port);
};

module.exports = Service;
