
var Webdino = require('./lib/Webdino');
var app = new Webdino();

var PORT = 5000;

app.on("ready", function() {
	this.httpserver.listen(PORT, function() {
		console.log("Listening on :"+PORT+" waiting for API to be consumed")
	});
})
