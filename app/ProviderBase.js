function ProviderBase() {
	this.memo = {}

	this.memoize = function (name, factory) {
		this[name] = function () {
			if (this.memo[name] === undefined) {
				this.memo[name] = factory.bind(this)()
			}

			return this.memo[name]
		}
	}
}

ProviderBase.prototype.inspect = function () {
	var keys = Object.keys(Object.getPrototypeOf(this))
	return '< provider: ' + keys.join(", ") + '>'
}

module.exports = ProviderBase
