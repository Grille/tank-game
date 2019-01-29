import http from "http";
import WebSocket from "ws";

import extend from '../extend.mjs'

import * as _gameLogic from './gameLogic';
import * as _utils from './utils';

export default class Server {
  constructor(port) {
    this.port = 51942;
    this.httpServer;
    this.socketServer;
    this.connections = [];
    this.players = [];
    
    this.tank = [{ x: 0, y: 0, angle: 0, speed: 0 }]
    this.eventMap = [{
      key: { up: 0, down: 0, left: 0, right: 0 },
      mouse: { x: 0, y: 0 }
    }]
    this.game;

    if (port != null)
      this.start(port);
  }
}

Server.prototype.start = function (port) {
  this.port = port;
  let _this = this;

  this.httpServer = new http.createServer(function (request, response) { }).listen(port);
  console.log("http server started at port ", port);

  this.socketServer = new WebSocket.Server({ server: _this.httpServer });
  console.log("socket ready ");

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