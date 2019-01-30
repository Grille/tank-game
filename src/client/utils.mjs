import ByteBuffer from '../lib/byteBuffer.mjs';

import Vehicle from '../share/vehicle.mjs';
import Player from '../share/player.mjs';

export function addEventsKeyMouse() {
  let onkey = (e, set) => {
    let send = false;
    if (e.keyCode == 38 && this.eventMap.key.up != set) {
      this.eventMap.key.up = set; send = true;
    }
    if (e.keyCode == 40 && this.eventMap.key.down != set) {
      this.eventMap.key.down = set; send = true;
    }
    if (e.keyCode == 37 && this.eventMap.key.left != set) {
      this.eventMap.key.left = set; send = true;
    }
    if (e.keyCode == 39 && this.eventMap.key.right != set) {
      this.eventMap.key.right = set; send = true;
    }
    if (this.socket.readyState && send) this.sendControl();
  }
  window.onkeydown = (e) => { onkey(e, 1) }
  window.onkeyup = (e) => { onkey(e, 0) }
}
export function sendControl() {
  let buffer = new ByteBuffer()
  buffer.writeUint8(2);
  buffer.writeUint8(this.eventMap.key.up);
  buffer.writeUint8(this.eventMap.key.down);
  buffer.writeUint8(this.eventMap.key.left);
  buffer.writeUint8(this.eventMap.key.right);
  this.socket.send(buffer.getBuffer());
}
export function connect(url) {

  let socket = this.socket = new WebSocket(url);
  socket.binaryType = "arraybuffer";
  socket.onopen = (e) => {
    console.log("open");
    let buffer = new ByteBuffer();
    buffer.writeUint8(0);
    //buffer.writeUint8(42)\\;
    let nr = (Math.random()*5)|0
    buffer.writeString("Name"+nr);
    buffer.writeUint8(255*Math.random());
    buffer.writeUint8(255*Math.random());
    buffer.writeUint8(255*Math.random());
    socket.send(buffer.getBuffer());
  }
  socket.onmessage = (e) => {
    let data = new ByteBuffer(e.data)
    let id = data.readUint8();
    //console.log("net: "+id);
    switch (id) {
      case 0:
      data.readUint8();
      this.localID = data.readUint8();
      this.printToChat("your id is "+this.localID);

      break;
      case 1:
        let chattxt = data.readString();
        this.printToChat(chattxt);
        break;

      case 10:
        id = data.readUint8();
        if (this.game.players[id] == null) this.game.players[id] = new Player();
        this.game.players[id].name = data.readString();
        this.game.players[id].color = {r:data.readUint8(),g:data.readUint8(),b:data.readUint8()};
        this.game.players[id].team = data.readUint8();

        let vehicleid = data.readUint8();
        if (vehicleid!=0)this.game.players[id].vehicle = this.game.vehicles[vehicleid-1];
        else this.game.players[id].vehicle = null;

        //this.printToChat(this.game.players[id].name +" join");
        break;
        case 12:
        id = data.readUint8();
        if (this.game.players[id] == null) this.game.players[id] = new Player();
        this.game.players[id].eventMap.key.up = data.readUint8();
        this.game.players[id].eventMap.key.down = data.readUint8();
        this.game.players[id].eventMap.key.left = data.readUint8();
        this.game.players[id].eventMap.key.right = data.readUint8();
        break;
      case 15:
        id = data.readUint8();
        if (this.game.vehicles[id]==null)this.game.vehicles[id]=new Vehicle();
        this.game.vehicles[id].location.x = data.readFloat32();
        this.game.vehicles[id].location.y = data.readFloat32();
        this.game.vehicles[id].velocity.x = data.readFloat32();
        this.game.vehicles[id].velocity.y = data.readFloat32();
        this.game.vehicles[id].angle = data.readFloat32();
        this.game.vehicles[id].speed = data.readFloat32();
        break;
    }

  }

}

export function addEvents() {
  /*
  let _this = this;
  window.addEventListener("keydown",(e)=>{
    console.log(e.keyCode);
    _this.keyDown[e.keyCode] = true;
  });
  window.addEventListener("keyup",(e)=>{
    _this.keyDown[e.keyCode] = false;
  });
  */
}
