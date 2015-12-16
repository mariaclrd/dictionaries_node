var express = require('express');

function expressApp(opts) {
	var dictionariesApi = opts.dictionariesApi;
	var logger = opts.logger;
	var app = express();

	if(opts.cirrusMiddleware) { opts.cirrusMiddleware.install(app); }

	// logger.info("AMONO CON EL LOGUE");

	app.put('/dictionaries/:id', dictionariesApi.update);

	return app;
}

module.exports = expressApp;
