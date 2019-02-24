import http from "http";
import WebSocket from "ws";

import extend from '../extend.mjs'

import * as _gameLogic from './gameLogic';
import * as _console from './console';
import * as _network from './network';
import * as _utils from './utils';

export default class Server {
  constructor(port) {
    this.console = {};
    this.port = 8080;
    this.httpServer;
    this.socketServer;
    this.connections = [];
    this.logs = [];
    this.game;
    this.startDate = 0;
    this.consoleInput = "";
    if (port != null)
      this.start(port);
    this.consoleInit();
    //setInterval(() => { this.consoleUpdate() }, 1000);
  }
}

Server.prototype.start = function (port) {
  this.startDate = Date.now();

  this.port = port;

  //this.httpServer = new http.createServer(function (request, response) { }).listen(port);
  
  //console.log("http server started at port ", port);

  this.socketServer = new WebSocket.Server({port});
  this.socketServer.on('connection', (socket) => {
    socket.binaryType = "arraybuffer";
    this.addConnection(socket);
  });
  this.startGame();
  this.consoleUpdate();
  this.consoleLog("started at port "+port);
  //this.gameLoop();
}
Server.prototype.stop = function() {
  this.socketServer.close();
  this.connections = [];
  this.game.reset();
}

extend(Server, _console)
extend(Server, _gameLogic)
extend(Server, _network)
extend(Server, _utils)