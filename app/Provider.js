function Provider() {}

Provider.prototype.service = function() {
	var service = {
		start: function () {}
	};

	return service;
};

module.exports = Provider;
