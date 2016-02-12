var DictionariesApi = require('../DictionariesApi');
var DictionariesActions = require('../Actions');
var DictionariesCollection = require('Dictionaries')

function Apis() {}

Apis.prototype.dictionaries = function () {
   	return new DictionariesApi(DictionariesActions.new(DictionariesCollection));
};

module.exports = Apis;
