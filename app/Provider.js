var Service = require('./Service');
var configFile = require('./configFile');
var expressApp = require('./expressApp');
var Dictionaries = require('./providers/Dictionaries');

function ProviderBase() {
	this.memo = {}

	this.memoize = function (name, factory) {
		this[name] = function () {
			if (this.memo[name] === undefined) {
				this.memo[name] = factory.bind(this)()
			}

			return this.memo[name]
		}
	}
}

ProviderBase.prototype.inspect = function () {
	var keys = Object.keys(Object.getPrototypeOf(this))
	return '< provider: ' + keys.join(", ") + '>'
}

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
