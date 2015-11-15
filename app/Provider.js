function Provider() {}

var Service = require('./Service');

Provider.prototype.service = function () {
	return new Service(this.config().http);
}

Provider.prototype.config = function () {
	var fs = require('fs');

	var defaultsPath = 'config/http-defaults.json'
	var overridesPath = 'config/http.json'
	var defaults = JSON.parse(fs.readFileSync(defaultsPath));

	try {
		var overrides = JSON.parse(fs.readFileSync(overridesPath));
		for (var attrname in overrides) { defaults[attrname] = overrides[attrname]; }
		return {http:defaults}
	} catch (err) {
		if (err.code === 'ENOENT') {
			return {http:defaults}
		} else {
			throw err
		}
	}
}

module.exports = Provider;
