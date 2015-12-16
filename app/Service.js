function Service(opts) {
	this.config = opts.config;
	this.expressApp = opts.expressApp;
}

Service.prototype.start = function () {
	//console.log("Config: " + JSON.stringify(this.config(), null, 2));

	//this.expressApp.listen(this.config.port);
	this.expressApp.listen(9001);
};

module.exports = Service;
