function Provider() {}

var Service = require('./Service');

Provider.prototype.service = function () {
	return new Service(this.config().http);
}

function configFile (name) {
	var fs = require('fs');

	var defaultsPath = 'config/' + name + '-defaults.json'
	var overridesPath = 'config/' + name + '.json'

	var defaults = JSON.parse(fs.readFileSync(defaultsPath));
	var overrides = {}
	var base = {}

	var key

	try {
		overrides = JSON.parse(fs.readFileSync(overridesPath));
	} catch (err) {
		if (err.code !== 'ENOENT') { throw err }
	}

	for (key in defaults) { base[key] = defaults[key]; }
	for (key in overrides) { base[key] = overrides[key]; }

	return base
}

Provider.prototype.config = function () {
	return {
		http: configFile('http')
	}
}

module.exports = Provider;
