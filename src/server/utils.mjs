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
  data.writeUint8(2);
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
    case 1:

      let name = data.readString();
      let color = {r:data.readUint8(),g:data.readUint8(),b:data.readUint8()};
      let player = null;

      data = new ByteBuffer();
      data.writeUint8(3);
      socket.send(data.getBuffer());
      data = new ByteBuffer();
      data.writeUint8(90);
      this.game.encodeList(90,data);
      socket.send(data.getBuffer());

      for (let ip = 0;ip<this.game.players.length;ip++){
        if (this.game.players[ip] != null && this.game.players[ip].name == name){
          let allowed = true
          for (let ic = 0; ic < this.connections.length; ic++) {
            if (this.connections[ic] != null && this.connections[ic].player == this.game.players[ip]) {
              data = new ByteBuffer();
              data.writeUint8(1);
              data.writeUint8(0);
              socket.send(data.getBuffer());
              socket.player = null;
              console.log("relogin refused <" + name + ">")
              return;
            }
          }
          player = this.game.players[ip];
          player.color = color;
          console.log("relogin accepted <" + player.name + ">")
        }
      }
      if (player == null) {
        player = new Player(name, color);
        this.game.addPlayer(player);
        console.log("login accepted <" + player.name + ">")
      }
      socket.player = player;
      if (player.vehicle == null) {
        let vehicle = new Vehicle();
        this.game.addVehicle(vehicle);
        player.vehicle = vehicle;
        vehicle.owner = player;
      }
      player.vehicle.color = player.color;

      data = new ByteBuffer();
      data.writeUint8(1);
      data.writeUint8(1);
      data.writeUint8(socket.player.id);
      socket.send(data.getBuffer());
      
      this.game.syncObject(20,player.vehicle);
      this.game.syncObject(10,player);

      break;
    case 2:
      let message = "";
      if (socket.player != null)
        message = socket.player.name + ": " + data.readString()
      else
        message = "*guest: " + data.readString()
      this.sendChatMessage(message);
      break;
    case 3:
      if (socket.player != null) {
        socket.player.eventMap.key.up = data.readUint8();
        socket.player.eventMap.key.down = data.readUint8();
        socket.player.eventMap.key.left = data.readUint8();
        socket.player.eventMap.key.right = data.readUint8();
        this.game.syncObject(12, socket.player);
      }
      break;
    case 4:
      if (socket.player != null) {
        socket.player.eventMap.mouse.angle = data.readFloat32();
        socket.player.eventMap.mouse.leftdown = data.readUint8();
        socket.player.eventMap.mouse.rightdown = data.readUint8();
        this.game.syncObject(13, socket.player);
      }
      break;
  }
}