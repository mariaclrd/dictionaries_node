var configFile = require('./configFile');
var expressApp = require('./expressApp');
var Dictionaries = require('./providers/Dictionaries');
var ProviderBase = require('./ProviderBase');
var configFile = require('./configFile.js');
var CirrusMiddleware = require('@workshare/nodejs-cirrus-auth/source/CirrusAuthMiddleware.js');
var wsLogger = require('@workshare/ws-logger');

var Service = require('./Service');

function Provider() { }

Provider.prototype = new ProviderBase()

Provider.prototype.memoize('expressApp', function () {
    var config = configFile('http')
	console.log('[Configurando expressApp] Tenemos el config ' + JSON.stringify(config))
	return expressApp({
		dictionariesApi: this.dictionaries().api(),
		cirrusMiddleware: new CirrusMiddleware({"port": 9001,"environment": "qa","database": {"url": "test"}}, {})
		// cirrusMiddleware: new CirrusMiddleware(this.config, {})
	})
});

Provider.prototype.memoize('service', function () {
	var opts = {
		config: this.config(),
		expressApp: this.expressApp()
	}

	return new Service(opts);
});

Provider.prototype.memoize('config', function () {
	return { http: configFile('http') }
});

Provider.prototype.memoize('dictionaries', function () {
	return new Dictionaries()
});

module.exports = Provider;
