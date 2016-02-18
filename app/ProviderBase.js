function ProviderBase() {
    var that = this;
	this.memo = {};

	this.memoize = function (name, factory) {
		that[name] = function () {
			if (that.memo[name] === undefined) {
				that.memo[name] = factory.bind(that)()
			}

			return that.memo[name];
		};
	}
}

ProviderBase.prototype.inspect = function () {
	var keys = Object.keys(Object.getPrototypeOf(this));
	return '< provider: ' + keys.join(", ") + '>'
};

module.exports = ProviderBase;
