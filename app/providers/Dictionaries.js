var ProviderBase = require('../ProviderBase');
var DictionariesApi = require('../DictionariesApi')

function DictionariesProvider() { }

DictionariesProvider.prototype = new ProviderBase()

DictionariesProvider.prototype.memoize('api', function () {
	return new DictionariesApi()
})

module.exports = DictionariesProvider
