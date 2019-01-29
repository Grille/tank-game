import ByteBuffer from '../lib/byteBuffer.mjs';

import Player from '../share/player.mjs';
import Vehicle from '../share/vehicle.mjs';

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
    this.messageHandler(socket, id, data);
  }
}


export function sendData(data) {
  let buffer = data.getBuffer();
  for (let i = 0; i < this.connections.length; i++) {
    let socket = this.connections[i];
    if (socket != null && socket != void 0 && socket.readyState==1) {
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
      let name = data.readString();
      let color = {r:data.readUint8(),g:data.readUint8(),b:data.readUint8()};
      let player = new Player(name,color);
      this.game.addPlayer(player);
      socket.player = player;
      this.sendChatMessage(name + " join");

      let vehicle = new Vehicle();
      this.game.addVehicle(vehicle);
      player.vehicle = vehicle;
      vehicle.color = player.color;
      vehicle.owner = player;

      data = new ByteBuffer();
      data.writeUint8(0);
      data.writeUint8(1);
      data.writeUint8(socket.id);
      socket.send(data.getBuffer());

      break;
    case 1:
      let message = socket.player.name + ": " + data.readString()
      this.sendChatMessage(message);
      break;
    case 2:
      socket.player.eventMap.key.up = data.readUint8();
      socket.player.eventMap.key.down = data.readUint8();
      socket.player.eventMap.key.left = data.readUint8();
      socket.player.eventMap.key.right = data.readUint8();
      break;
  }
}