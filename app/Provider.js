var configFile = require('./configFile');
var expressApp = require('./expressApp');
var Dictionaries = require('./providers/Dictionaries');
var ProviderBase = require('./ProviderBase');
var configFile = require('./configFile.js');
var CirrusMiddleware = require('@workshare/nodejs-cirrus-auth');
var wsLogger = require('@workshare/ws-logger');
var Service = require('./Service');

var loggerFactory = new wsLogger.Log4jsConfigLoggerFactory();
var logger = loggerFactory.get('app');

function Provider() {}

Provider.prototype = new ProviderBase()

Provider.prototype.memoize('expressApp', function () {
    var config = configFile('http')
	return expressApp({
		dictionariesApi: this.dictionaries().api(),
		cirrusMiddleware: new CirrusMiddleware(configFile('http')(), {}),
		logger: this.logger
	})
});

Provider.prototype.memoize('service', function () {
	var opts = {
		config: configFile('http')(),
		expressApp: this.expressApp(),
		logger: this.logger
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
