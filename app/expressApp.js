var express = require('express');

function expressApp(opts) {
	var dictionariesApi = opts.dictionariesApi;
	var logger = opts.logger;
	var app = express();

	var cookieParser = require('cookie-parser');
	app.use(cookieParser());

    var bodyParser  = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

	if(opts.cirrusMiddleware) { opts.cirrusMiddleware.install(app); }

	app.put('/dictionaries/:id', dictionariesApi.update);
	app.get('/ping', function (req, res) {
	  res.send('pong');
	});
	return app;
}

module.exports = expressApp;
