function Provider() {}

var Service = require('./Service');
var configFile = require('./configFile');

Provider.prototype.service = function () {
	return new Service(this.config().http);
}

Provider.prototype.config = function () {
	return {
		http: configFile('http')
	}
}

module.exports = Provider;
