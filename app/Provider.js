var Service = require('./Service');
var configFile = require('./configFile');
var expressApp = require('./expressApp');
var Dictionaries = require('./providers/Dictionaries');
var ProviderBase = require('./ProviderBase');

function Provider() { }

Provider.prototype = new ProviderBase()

Provider.prototype.memoize('expressApp', function () {
	return expressApp({
		dictionariesApi: this.dictionaries().api()
	})
})

Provider.prototype.memoize('service', function () {
	var opts = {
		config: this.config().http,
		expressApp: this.expressApp()
	}

	return new Service(opts);
});

Provider.prototype.memoize('config', function () {
	return { http: configFile('http') }
})

Provider.prototype.memoize('dictionaries', function () {
	return new Dictionaries()
})

module.exports = Provider;
