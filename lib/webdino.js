'use strict';

// Express is the base Web Server for API & local files
var express = require('express');

// CORS is required for cross domain data requests
var cors = require('cors');



// // Util & Events to use Events.Emitter
var util = require("util");
var events = require("events");

var WebdinoApi = require("./ApiManager");


var Webdino = function(opts) {
  // var self = this;
  
  // Ensure opts is an object
  opts = opts || {};

  if ( !(this instanceof Webdino) ) {
    return new Webdino(opts);
  }

  this.name = 'dominik'

  var expressApp = express(); 
  this.httpserver = require('http').createServer(expressApp);
  expressApp.use(cors());
  expressApp.use(express.static('public'));


  var api = WebdinoApi(this.httpserver, opts);
  this.api = api;

  this.api.on('ready', function(){

    this.io = require('socket.io')(this.httpserver);

    this.io.on('connection',function(d) {
      console.log("New socket.io connection: ");
    });

    /* REST Implementation here*/

    // Request for "board" object
    // expressApp.get('/api/board', getBoard);
    // // Request for "webduino" object
    // expressApp.get('/api/webduino', getWebduino);
    // expressApp.get('/api/:resource/:id', getElement);
    // expressApp.put('/api/:resource/:id', putElement);
    // expressApp.get('/api/:resource', getCollection);
    /* REST Implementation here*/
    
    // Route that triggers a sample error:
    expressApp.get('/error', function createError(req, res) {
      res.send(500, { error: 'something blew up' });
    });

    this.emit('ready');

  }.bind(this));

  return this;
}; 


util.inherits( Webdino, events.EventEmitter );





module.exports = Webdino;