var repl = require("repl");
var Provider = require('./app/Provider');
var dictionaries = new Provider();

var replServer = repl.start({
	  prompt: "dictionaries > ",
});

replServer.context.dictionaries = dictionaries;
