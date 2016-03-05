"use strict";

const express = require('express');
const http = require('http');
const eventService = require('./event');
const io = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('hbs');

/**
* Express app
*/
const _app = express();

/**
*  HTTP server
*/
let _server;

/**
* Socket IO
*/
let _io;

/**
* Connected socket
*/
let _socket;

/**
* Callback when a client get connected
* @param  {Sockter} socket Connect socket from client
* @return {void}
*/
const _onConnection = (socket) => {
  eventService.emit('sensor.connected');
  _socket = socket;
  _registerEvents(socket);
};

/**
* Create http and socket service
* @return {void}
*/
const _createServer = () => {
  _server = http.createServer(_app);

  _app.set('views', './dist');
  _app.set('view engine', 'hbs');

  // Define static folder, for asset include
  _app.use(
    express.static(
      path.join(__dirname, '/../../dist')
    )
  );

  _app.use(
    bodyParser.urlencoded(
      { extended: false }
    )
  );

  hbs.registerPartials(__dirname + '/../../dist/_partial');

  _server.listen(8081, () => {
    const host = _server.address().address;
    const port = _server.address().port;

    console.log('App listening at http://%s:%s', host, port);
  });

  _app.get('/', require('../../routes/hue'));
  _app.get('/zwave', require('../../routes/zwave'));

  _io = io(_server);
  _io.on('connection', _onConnection);
};

/**
* Delegate socket events to eventService and vice versa
* @param  {[type]} socket [description]
* @return {[type]}    [description]
*/
const _registerEvents = (socket) => {
  eventService.on('socketService.send', (data) => {
    socket.emit(data.eventName, data.eventData);
  });

  socket.on('server.send', (data) => {
    eventService.emit(data.eventName, data.eventData);
  });
};

_createServer();

const SocketService = {
  on: (eventName, eventData) => {
    _socket.on(eventName, eventData);
  },

  emit: (eventName, eventData) => {
    _socket.emit(eventName, eventData);
  },
};

module.exports = SocketService;
