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
    if (this.socket.readyState==1 && send) this.sendControl();
  }
  window.onkeydown = (e) => { onkey(e, 1) }
  window.onkeyup = (e) => { onkey(e, 0) }
}
export function sendControl() {
  let buffer = new ByteBuffer()
  buffer.writeUint8(3);
  buffer.writeUint8(this.eventMap.key.up);
  buffer.writeUint8(this.eventMap.key.down);
  buffer.writeUint8(this.eventMap.key.left);
  buffer.writeUint8(this.eventMap.key.right);
  this.socket.send(buffer.getBuffer());
}
export function connect(url) {
  if (this.socket.readyState == 1)this.socket.close();
  let socket = this.socket = new WebSocket(url);
  socket.binaryType = "arraybuffer";
  socket.onopen = (e) => {
    console.log("open");
    let buffer = new ByteBuffer();
    buffer.writeUint8(1);
    //buffer.writeUint8(42)\\;
    let nr = (Math.random()*5)|0
    buffer.writeString(html_inputName.value);
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
      case 1:
        let result = data.readUint8();
        if (result) {
          this.localID = data.readUint8();
          this.printToChat("your id is " + this.localID);
        }
        else{
          this.printToChat("login refused");
        }

      break;
      case 2:
        let chattxt = data.readString();
        this.printToChat(chattxt);
        break;
      case 10:case 11:case 12:case 13:
        this.game.decode(id,data);
        break;
      case 20:
        this.game.decode(id,data);
        break;
        case 90:
        this.game.decode(id, data);
        break;
        case 91:
        this.game.decode(id, data);
        break;
      case 92:
        this.game.decode(id, data);
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
