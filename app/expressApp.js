var express = require('express');
var bodyParser = require('body-parser');

function expressApp(opts) {
	var dictionariesApi = opts.dictionariesApi;
	var logger = opts.logger;
	var app = express();

    var cookieParser = require('cookie-parser');
    app.use(cookieParser());

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());


	if(opts.cirrusMiddleware) { opts.cirrusMiddleware.install(app); }

	app.put('/:scope/:uuid/dictionaries/:name', dictionariesApi.update.bind(dictionariesApi));
	app.get('/ping', function (req, res) {
	  res.send('pong');
	});
	return app;
}

module.exports = expressApp;
