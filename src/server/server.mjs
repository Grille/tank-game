import { test } from './test.mjs';

import http from "http";
import WebSocket from "ws";
import ByteBuffer from '../share/byteBuffer.js';

const PORT = 51942;

let server;
let wss;

let nextID = 0;
let connections = [];


test();

function main() {
  server = new http.createServer(function (request, response) { }).listen(PORT);
  console.log("http server started at port ", PORT);

  wss = new WebSocket.Server({ server });
  console.log("socket ready ");

  wss.on('connection', function connection(ws) {
    ws.binaryType = "arraybuffer";
    console.log("someone connected");
    addConnection(ws);
    //console.log(ws)
    ws.on('message', (message) => {
      ws.isAlive = true;
      //console.log(message)
      let buffer = new ByteBuffer(message)
      //const array = new Uint8Array(message);
      let id = buffer.readUInt8();
      console.log("\nmessage id: "+id);
      switch (id) {
        case 0:
          console.log(id);
          console.log(ws.name= buffer.readString());
          //ws.send(buffer.getBuffer());
          break;
        case 1:
          let message = ws.name +": "+buffer.readString()
          sendMessage(message);
          break;
        case 2:
          break;
      }
    });
  });
}

function addConnection(ws) {
  for (let i = 0; i < connections.length + 1; i++) {
    if (connections[i] == null || connections[i] == void 0) {
      connections[i] = ws
      ws.id = i;
      ws.name="-";
      console.log("open " + ws.id);
      break;
    }
  }
  ws.onerror = function (e) {
    console.log(e);
  };
  ws.onclose = function (e) {
    console.log("close " + ws.id);
    connections[ws.id] = null;

  }
}

function sendMessage(message){
  buffer = new ByteBuffer();
  buffer.writeUInt8(1);
  buffer.writeString(message);
  buffer = buffer.getBuffer();
  for (let i = 0; i < connections.length; i++) {
    let ws = connections[i];
    if (ws != null && ws != void 0) {
      console.log("send \""+message+"\" to "+ws.id);
      ws.send(buffer);
    }
  }
}




main();
