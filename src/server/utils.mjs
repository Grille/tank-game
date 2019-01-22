import ByteBuffer from '../share/byteBuffer.mjs';

export function addConnection(socket) {
    
    for (let i = 0; i < this.connections.length + 1; i++) {
      if (this.connections[i] == null || this.connections[i] == void 0) {
        this.connections[i] = socket
        socket.id = i;
        socket.name="-";
        console.log("open " + socket.id);
        break;
      }
    }

    socket.onerror = (e) => {
      console.log(e);
    };
    socket.onclose = (e) => {
      console.log("close " + socket.id);
      this.connections[socket.id] = null;
    }
    socket.onmessage = (e) => {
      socket.isAlive = true;
      let data = new ByteBuffer(e.data)
      let id = data.readUInt8();
      console.log("\nmessage id: "+id);
      this.messageHandler(socket,id,data);
    }
  }
  
  export function sendChatMessage(message){
    let buffer = new ByteBuffer();
    buffer.writeUInt8(1);
    buffer.writeString(message);
    buffer = buffer.getBuffer();
    for (let i = 0; i < this.connections.length; i++) {
      let ws = this.connections[i];
      if (ws != null && ws != void 0) {
        console.log("send \""+message+"\" to "+ws.id);
        ws.send(buffer);
      }
    }
  }

  export function messageHandler(socket,id,data){
    switch (id) {
      case 0:
        console.log(id);
        console.log(socket.name = data.readString());
        //ws.send(buffer.getBuffer());
        break;
      case 1:
        let message = socket.name + ": " + data.readString()
        this.sendChatMessage(message);
        break;
      case 2:
        break;
    }
  }