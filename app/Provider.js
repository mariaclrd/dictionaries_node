var Service = require('./Service');
var configFile = require('./configFile');
var expressApp = require('./expressApp');
var Dictionaries = require('./providers/Dictionaries');

function Provider() {
	this.memo = {}
}

Provider.prototype.expressApp = function () {
	if (this.memo.expressApp === undefined) {
		this.memo.expressApp = expressApp({
			dictionariesApi: this.dictionaries().api()
		})
	}

	return this.memo.expressApp
}

Provider.prototype.service = function () {
	var opts = {
		config: this.config().http,
		expressApp: this.expressApp.bind(this)
	}

	return new Service(opts);
}

Provider.prototype.config = function () {
	return {
		http: configFile('http')
	}
}

Provider.prototype.dictionaries = function () {
	if (this.memo.dictionaries === undefined) {
		this.memo.dictionaries = new Dictionaries()
	}

	return this.memo.dictionaries
}

module.exports = Provider;
