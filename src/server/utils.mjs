import ByteBuffer from '../share/byteBuffer.mjs';

export function addConnection(socket) {

  for (let i = 0; i < this.connections.length + 1; i++) {
    if (this.connections[i] == null || this.connections[i] == void 0) {
      this.connections[i] = socket
      socket.id = i;
      socket.name = "ID_" + i;
      console.log("open " + socket.id);
      this.tank[i] = { x: 0, y: 0,angle:0,speed:0 };
      this.eventMap[i] = {
        key: { up: 0, down: 0, left: 0, right: 0 },
        mouse: { x: 0, y: 0 }
      };
      break;
    }
  }
  socket.onerror = (e) => {
    console.log(e);
  };
  socket.onclose = (e) => {
    console.log("close " + socket.id);
    let name = socket.name;
    this.connections[socket.id] = null;
    this.sendChatMessage(socket.name + " left");
  }
  socket.onmessage = (e) => {
    socket.isAlive = true;
    let data = new ByteBuffer(e.data)
    let id = data.readUint8();
    console.log("\nmessage id: " + id);
    this.messageHandler(socket, id, data);
  }
}


export function sendData(data) {
  let buffer = data.getBuffer();
  for (let i = 0; i < this.connections.length; i++) {
    let socket = this.connections[i];
    if (socket != null && socket != void 0 && socket.connected) {
      socket.send(buffer);
    }
  }
}

export function sendChatMessage(message) {
  let data = new ByteBuffer();
  data.writeUint8(1);
  data.writeString(message);
  this.sendData(data)
}


/*
  let buffer = new ByteBuffer()
  buffer.writeUint8(2);
  buffer.writeUint8(this.eventMap.key.up);
  buffer.writeUint8(this.eventMap.key.down);
  buffer.writeUint8(this.eventMap.key.left);
  buffer.writeUint8(this.eventMap.key.right);
  */

export function messageHandler(socket, id, data) {
  switch (id) {
    case 0:
    console.log("send 0");
      socket.name = data.readString();
      this.sendChatMessage(socket.name + " join");
      
      data = new ByteBuffer();
      data.writeUint8(0);
      data.writeUint8(1);
      data.writeUint8(socket.id);
      socket.send(data.getBuffer());

      break;
    case 1:
      let message = socket.name + ": " + data.readString()
      this.sendChatMessage(message);
      break;
    case 2:
      this.eventMap[socket.id].key.up = data.readUint8();
      this.eventMap[socket.id].key.down = data.readUint8();
      this.eventMap[socket.id].key.left = data.readUint8();
      this.eventMap[socket.id].key.right = data.readUint8();
      break;
  }
}