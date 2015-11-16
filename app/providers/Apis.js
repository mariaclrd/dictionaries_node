var DictionariesApi = require('../DictionariesApi')

function Apis() {}

Apis.prototype.dictionaries = function () {
   	return new DictionariesApi()
}

module.exports = Apis
