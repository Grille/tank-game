import ByteBuffer from '../lib/byteBuffer.mjs';

import Player from '../share/player.mjs';
import Vehicle from '../share/vehicle.mjs';

export function addConnection(socket) {

  for (let i = 0; i < this.connections.length + 1; i++) {
    if (this.connections[i] == null || this.connections[i] == void 0) {
      this.connections[i] = socket
      socket.id = i;
      socket.player=null;
      console.log("open " + socket.id);
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


export function sendData(data,exception) {
  let buffer = data.getBuffer();
  for (let i = 0; i < this.connections.length; i++) {
    let socket = this.connections[i];
    if (socket != null && socket != void 0 && socket.readyState==1 && exception != socket) {
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
      //this.sendChatMessage(name + " join");

      let vehicle = new Vehicle();
      this.game.addVehicle(vehicle);
      player.vehicle = vehicle;
      vehicle.color = player.color;
      vehicle.owner = player;



      data = new ByteBuffer();
      data.writeUint8(0);
      data.writeUint8(1);
      console.log(socket.id);
      data.writeUint8(socket.player.id);
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

      data = new ByteBuffer();
      data.writeUint8(12);
      data.writeUint8(socket.player.id);
      data.writeUint8(socket.player.eventMap.key.up);
      data.writeUint8(socket.player.eventMap.key.down);
      data.writeUint8(socket.player.eventMap.key.left);
      data.writeUint8(socket.player.eventMap.key.right);
      this.sendData(data);
      //console.log(data.getBuffer());
      break;
  }
}