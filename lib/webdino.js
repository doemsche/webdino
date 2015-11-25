'use strict';
var http= require('http');
// Express is the base Web Server for API & local files
var express = require('express');
// CORS is required for cross domain data requests
var cors = require('cors');
// // Util & Events to use Events.Emitter
var util = require("util");
var events = require("events");

var dns = require('dns');

var ApiManager = require("./apimanager");

function Webdino(){
  this.name = 'dominik';
  _setupExpress.call(this);
  _setupApi.call(this);
  _bindEvents.call(this);
}

function _setupExpress(){
  this.expressApp = express(); 
  this.httpserver = require('http').createServer(this.expressApp);
  this.expressApp.use(cors());
  this.expressApp.use(express.static('public'));
}

function _setupApi(){
  this.api = new ApiManager(this.httpserver);
}

function _bindEvents(){
  this.api.on('ready', function(){
    //API GET RESOURCE
    this.expressApp.get('/api/:resource/:id', function(req,res){
        var id = req.params.id;
        var value = req.query.value;
        var resource = req.params.resource;
        this.api.getApiData(id,resource, value, function(obj){
          res.send(obj)
        });
    // // options for GET
    //   var optionsget = {
    //       host : '192.168.35.173', // here only the domain name
    //       // (no http/https !)
    //       port : 5000,
    //       path : '/api/pins/12?value=1', // the rest of the url with parameters if needed
    //       method : 'GET' // do GET
    //   };

    //   var reqGet = http.request(optionsget, function(res) {
    //     console.log("statusCode: ", res.statusCode);
    //     // uncomment it for header details
    // //  console.log("headers: ", res.headers);
     
     
    //     res.on('data', function(d) {
    //         console.info('GET result:\n');
    //         process.stdout.write(d);
    //         console.info('\n\nCall completed');
    //     })
    //   });

    }.bind(this));

    //EMIT READY => this => Webduino
    this.emit('ready');

  }.bind(this));

}

Webdino.prototype = Object.create( events.EventEmitter.prototype );


module.exports = Webdino;