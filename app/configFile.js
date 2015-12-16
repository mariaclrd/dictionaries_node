var fs = require('fs');

function loadConfig(name) {
	var defaultsPath = '../config/' + name + '-defaults.json'
	var overridesPath = '../config/' + name + '.json'

	var defaults = JSON.parse(fs.readFileSync(defaultsPath));
    console.log('El default File: ' + JSON.stringify(defaults))
	var overrides = {};
	var base = {};

	var key;

	try {
		overrides = JSON.parse(fs.readFileSync(overridesPath));
	} catch (err) {
		if (err.code !== 'ENOENT') { throw err }
	}

	for (key in defaults) { base[key] = defaults[key]; }
	for (key in overrides) { base[key] = overrides[key]; }

    console.log('Se esta creando el config: ' + base)

	return base;
}


function configFile (name) {
	var config;
    console.log('Se lee configFile con ' + name);
    console.log('Se esta creando el config, lo que vale config antes: ' + config);
	return function () {
		if (config === undefined) { config = loadConfig(name); }
        console.log('Se esta creando el config, lo que vale config despues: ' + config);
		return config;
	}
	// if (config === undefined) { config = loadConfig(name); }
	// return config;
}

module.exports = configFile;
