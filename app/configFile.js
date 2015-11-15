var fs = require('fs');

function loadConfig(name) {
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


function configFile (name) {
	var config

	return function () {
		if (config === undefined) { config = loadConfig(name); }
		return config
	}
}

module.exports = configFile
