function Service(opts) {
	this.config = opts.config;
	this.expressApp = opts.expressApp;
	this.logger = opts.logger;
}

Service.prototype.start = function () {
	//console.log("Config: " + JSON.stringify(this.config(), null, 2));

	this.expressApp.listen(this.config.port);
};

module.exports = Service;
