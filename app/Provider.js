function Provider() {}

var Service = require('./Service');

Provider.prototype.service = function () {
	return new Service(this.config().http);
}

Provider.prototype.config = function () {
	return {
		http: {port: 3000}
	}
}

module.exports = Provider;
