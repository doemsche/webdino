var events = require("events");
var util = require("util");

// Control Arduino Input/Output through Johnny-Five
var five = require("johnny-five");



var ApiManager = function(server, opts) {
	var self = this;

	if ( !(this instanceof ApiManager) ) {
		return new ApiManager( server, opts );
	}

	this.board = new five.Board();

	this.board.on("ready",function() {
		self.emit( "ready", null );
	});
}

util.inherits( ApiManager, events.EventEmitter );


module.exports = ApiManager;