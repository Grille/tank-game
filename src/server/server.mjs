import http from "http";
import WebSocket from "ws";

import extend from '../extend.mjs'

import * as _gameLogic from './gameLogic';
import * as _utils from './utils';

export default class Server {
  constructor(port) {
    this.port = 8080;
    this.httpServer;
    this.socketServer;
    this.connections = [];
    this.game;
    if (port != null)
      this.start(port);
  }
}

Server.prototype.start = function (port) {
  this.port = port;

  this.httpServer = new http.createServer(function (request, response) { }).listen(port);

  console.log("http server started at port ", port);

  this.socketServer = new WebSocket.Server({ server: this.httpServer });

  //console.log("socket server started at adsress ", this.socketServer.address().address);
  //console.log("socket server started at port ", this.socketServer.address().port);

  this.socketServer.on('connection', (socket) => {
    socket.binaryType = "arraybuffer";
    console.log("someone connected");
    this.addConnection(socket);
  });
  this.startGame();
  //this.gameLoop();
}

extend(Server, _gameLogic)
extend(Server, _utils)