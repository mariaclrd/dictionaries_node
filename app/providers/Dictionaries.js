var DictionariesApi = require('../DictionariesApi')

function DictionariesProvider() {
	this.memo = {}
}

DictionariesProvider.prototype.api = function () {
	if (this.memo.api === undefined) {
		console.log('Building dictionariesApi');

		this.memo.api = new DictionariesApi()
	}

	return this.memo.api
}

module.exports = DictionariesProvider
