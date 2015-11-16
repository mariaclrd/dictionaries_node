var Service = require('./Service');
var configFile = require('./configFile');
var expressApp = require('./expressApp');
var Dictionaries = require('./providers/Dictionaries');

function Provider() {
	this.memo = {}
	this.inspect = function () {
		var keys = Object.keys(Object.getPrototypeOf(this))
		return '< dictionaries: ' + keys.join(", ") + '>'
	}
}

Provider.prototype.expressApp = function () {
	if (this.memo.expressApp === undefined) {
		console.log('Building expressApp');

		this.memo.expressApp = expressApp({
			dictionariesApi: this.dictionaries().api()
		})
	}

	return this.memo.expressApp
}

Provider.prototype.service = function () {
	if (this.memo.service === undefined) {
		var opts = {
			config: this.config().http,
			expressApp: this.expressApp()
		}

		console.log('Building service');

		this.memo.service = new Service(opts);
	}

	return this.memo.service
}

Provider.prototype.config = function () {
	if (this.memo.config === undefined) {
		console.log('Building config');

		this.memo.config = {
			http: configFile('http')
	   	}
	}

	return this.memo.config
}

Provider.prototype.dictionaries = function () {
	if (this.memo.dictionaries === undefined) {
		console.log('Building dictionaries');
		this.memo.dictionaries = new Dictionaries()
	}

	return this.memo.dictionaries
}

module.exports = Provider;
