function Provider() {}

var Service = require('./Service');

Provider.prototype.service = function () {
	return new Service();
}

module.exports = Provider;
