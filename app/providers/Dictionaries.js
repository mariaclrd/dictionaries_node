var ProviderBase = require('../ProviderBase');
var DictionariesApi = require('../DictionariesApi');
var Dictionaries = require('../models/Dictionaries');
var Actions =  require('../Actions');


function DictionariesProvider() { }

DictionariesProvider.prototype = new ProviderBase()

DictionariesProvider.prototype.memoize('api', function () {
	var dicitonariesCollection = new Dictionaries();
	var actions = new Actions(dicitonariesCollection);
	return new DictionariesApi(actions)
});

module.exports = DictionariesProvider;
