import ByteBuffer from '../lib/byteBuffer.mjs';


export function sendKeyControls() {
  let buffer = new ByteBuffer()
  buffer.writeUint8(3);
  buffer.writeUint8(this.eventMap.key.up);
  buffer.writeUint8(this.eventMap.key.down);
  buffer.writeUint8(this.eventMap.key.left);
  buffer.writeUint8(this.eventMap.key.right);
  this.socket.send(buffer.getBuffer());
}
export function sendMouseControls() {
  let buffer = new ByteBuffer()
  buffer.writeUint8(4);
  buffer.writeFloat32(this.eventMap.mouse.angle);
  buffer.writeUint8(this.eventMap.mouse.leftdown);
  buffer.writeUint8(this.eventMap.mouse.rightdown);
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
        else {
          this.printToChat("login refused");
        }
        break;
      case 2:
        let chattxt = data.readString();
        this.printToChat(chattxt);
        break;
      case 3: this.game.reset();
        break;
      case 10: case 11: case 12: case 13:
        this.game.decode(id, data);
        break;
      case 20:
        this.game.decode(id, data);
        break;
      case 90:
        console.log("90")
        this.game.decode(id, data);
        console.log(this.game.players)
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