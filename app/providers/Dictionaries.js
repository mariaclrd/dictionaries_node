var ProviderBase = require('../ProviderBase');
var DictionariesApi = require('../DictionariesApi');
var Dictionaries = require('../models/Dictionaries');
var Actions =  require('../Actions');
var Mongoose = require('mongoose');


function DictionariesProvider() { }

DictionariesProvider.prototype = new ProviderBase()

DictionariesProvider.prototype.memoize('api', function ()   {
	  return new DictionariesApi(this.actions())
});

DictionariesProvider.prototype.memoize('actions', function () {
    return new Actions(this.model());
});

DictionariesProvider.prototype.memoize('model', function () {
    this.db();
    return Dictionaries;
});

DictionariesProvider.prototype.memoize('db', function () {
    return Mongoose.connect('mongodb://localhost:27017/dictionaries');
});


module.exports = DictionariesProvider;
