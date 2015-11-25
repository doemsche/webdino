// 'use strict';

// Express is the base Web Server for API & local files
var express = require('express');
// CORS is required for cross domain data requests
var cors = require('cors');
// // Util & Events to use Events.Emitter
var util = require("util");
var events = require("events");

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
    }.bind(this));

    //EMIT READY => this => Webduino
    this.emit('ready');

  }.bind(this));

}

Webdino.prototype.getApiData = function(req,res){
  console.log(req.param.id);
}

Webdino.prototype = Object.create( events.EventEmitter.prototype );

module.exports = Webdino;