import ByteBuffer from '../share/byteBuffer.mjs';

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
    //buffer.writeUint8(42);
    buffer.writeString("name");
    socket.send(buffer.getBuffer());
  }
  socket.onmessage = (e) => {
    let data = new ByteBuffer(e.data)
    let id = data.readUint8();
    //console.log("net: "+id);
    switch (id) {
      case 0:
      console.log(data);
      data.readUint8();
      this.localID = data.readUint8();
      this.printToChat("your id is "+this.localID);

      break;
      case 1:
        let chattxt = data.readString();
        this.printToChat(chattxt);
        break;
      case 2:
        let id = data.readUint8();
        this.tank[id].x = data.readFloat32();
        this.tank[id].y = data.readFloat32();
        this.tank[id].angle = data.readFloat32();
        this.tank[id].speed = data.readFloat32();
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
