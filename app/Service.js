function Service() {}

Service.prototype.start = function () {
	var express = require('express');
	var server = express();
	server.listen(3000);
};

module.exports = Service;
