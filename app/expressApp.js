var express = require('express');

function expressApp(opts) {
	var dictionariesApi = opts.dictionariesApi;
	var app = express();

	if(opts.cirrusMiddleware) { opts.cirrusMiddleware.install(app); }

	app.put('/dictionaries/:id', dictionariesApi.update);

	return app;
}

module.exports = expressApp;
