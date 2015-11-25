var events = require("events");
var util = require("util");
// Control Arduino Input/Output through Johnny-Five
var five = require("johnny-five");
function ApiManager(server, opts) {
	// events.EventEmitter.call(this);
	this.board = new five.Board();

	this.board.on("ready",function() {
		this.emit( "ready", null );
	}.bind(this));
}

ApiManager.prototype = Object.create( events.EventEmitter.prototype );
ApiManager.prototype.getApiData = function(id,resource,value,cb){
	var obj = {
		type: resource,
		id: id
	};
	var pin = new five.Pin(obj.id);
	var onoff = value == 1 ? true : false;

	if(onoff){
		pin.high();
	} else {
		pin.low();
	}
	cb(obj);
}

module.exports = ApiManager;