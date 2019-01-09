const fs = require("fs");
const http = require("http");
const WebSocket = require("ws");
const ByteBuffer = require('../share/byteBuffer.js');

function startServer(atr) {
  if (atr = "local") {
    localServer = new Server();
  }
}

const PORT = 51942

const server = new http.createServer(function (request, response) {
}).listen(PORT);

console.log("http server started at port ", PORT);

const wss = new WebSocket.Server({ server });

console.log("socket ready ");

let connections = [];

wss.on('connection', function connection(ws) {
  console.log("someone connected")
  //console.log(ws)
  ws.on('error', (err) => {
    console.log(err);
  });

  ws.on('close', () => {
    console.log("close")
  });

  ws.on('message', (message) => {
    ws.isAlive = true;
    //console.log(message)
    const array = new Uint8Array(message);
    console.log(array[0]);
    switch (array[0]){
      case 42:
      console.log("case 42");
      let buffer = new ByteBuffer(array)
      buffer.readUInt8();
      console.log(buffer.readString());
      break;
    }
    //const buf = array.buffer;
    //const dv = new DataView(buf);
    //console.log(array[0]);
    /* 
    switch (array[0]) {
    case PING:
    console.log("client ping");
	    ws.send(pong());
      case PONG:
        console.log("client responded");
        break;
      default:
        console.log("response not found", message);
    }
    */
  });
});
