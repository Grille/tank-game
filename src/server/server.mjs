import http from "http";
import WebSocket from "ws";

import extend from '../extend.mjs'

import * as _utils from './utils';

export default class Server{
    constructor(port){
        this.port = 51942;
        this.httpServer;
        this.socketServer;
        this.connections = [];

        if (port != null)
            this.start(port);
    }
}

Server.prototype.start = function(port) {
    this.port = port;
    let _this = this;

    this.httpServer = new http.createServer(function (request, response) { }).listen(port);
    console.log("http server started at port ", port);

    this.socketServer = new WebSocket.Server({ server: _this.httpServer });
    console.log("socket ready ");

    this.socketServer.on('connection', (ws) => {
        ws.binaryType = "arraybuffer";
        console.log("someone connected");
        this.addConnection(ws);
    });
}

extend(Server,_utils)