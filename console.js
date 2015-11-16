var repl = require("repl");
var Provider = require('./app/Provider');
var provider = new Provider();

console.log('"provider" is available:');

var replServer = repl.start({
	  prompt: "dictionaries > ",
});


replServer.context.provider = provider;
