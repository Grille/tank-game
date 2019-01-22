let cam ={x:0,y:0,z:0};
let objects = [];
let tanks = [];
let keyDown = [];

class Client{
  constructor(){
    this.cam ={x:0,y:0,z:0}
    this.objects = [];
    this.tanks = [];
    this.keyDown = [];
    this.socket = {
      readyState:0
    }
    this.gl2d;
    this.eventMap = {
      key:{
        up:0,
        down:0,
        left:0,
        right:0
      },
      mouse:{
        x:0,
        y:0
      }
    }
  }
}

Client.prototype.initChat = function(){
  let _this = this;
  html_chat.onchange = function(e){
    if (_this.socket.readyState && html_chat.value != ""){
      let buffer = new ByteBuffer()
      buffer.writeUInt8(1);
      buffer.writeString(html_chat.value)
      _this.socket.send(buffer.getBuffer());
      html_chat.value = "";
    }
  }
}
Client.prototype.addEventsKeyMouse = function(){
  let _this = this;
  window.onkeydown = function(e){
    //console.log(e.keyCode);
    let send = true;
    switch (e.keyCode){
      case 38:_this.eventMap.key.up = 1;break;
      case 40:_this.eventMap.key.down = 1;break;
      case 37:_this.eventMap.key.left = 1;break;
      case 39:_this.eventMap.key.right = 1;break;
      default:send = false;break;
    }
    if (_this.socket.readyState && send)_this.sendControl();
  }
  window.onkeyup = function(e){
    //console.log(e.keyCode);
    switch (e.keyCode) {
      case 38:_this.eventMap.key.up = 0;break;
      case 40:_this.eventMap.key.down = 0;break;
      case 37:_this.eventMap.key.left = 0;break;
      case 39:_this.eventMap.key.right = 0;break;
      default:send = false;break;
    }
    if (_this.socket.readyState && send)_this.sendControl();
  }
}
Client.prototype.sendControl = function(){
  let buffer = new ByteBuffer()
  buffer.writeUInt8(2);
  buffer.writeUInt8(this.eventMap.key.up);
  buffer.writeUInt8(this.eventMap.key.down);
  buffer.writeUInt8(this.eventMap.key.left);
  buffer.writeUInt8(this.eventMap.key.right);
  this.socket.send(buffer.getBuffer());
}
Client.prototype.setRenderTraget = function(canvas){
  this.gl2d = new WebGL2DContext(canvas);
}
Client.prototype.connect = function(url){

  let socket = this.socket = new WebSocket(url);
  socket.binaryType = "arraybuffer";
  socket.onopen = function(e){
    console.log("open");
    let buffer = new ByteBuffer();
    buffer.writeUInt8(0);
    //buffer.writeUInt8(42);
    buffer.writeString("name");
    socket.send(buffer.getBuffer());
  }
  socket.onmessage = function(e){
    let buffer = new ByteBuffer(e.data)
    let id = buffer.readUInt8();
    console.log("message id: "+id)
    switch (id){
      case 1:
      console.log("chat: "+buffer.readString())
      break;
    }
    
  }

}
Client.prototype.start = function(){
  this.addEvents();
  this.initChat();
  this.addEventsKeyMouse();
  //this.logic();
  //this.render();
}
Client.prototype.addEvents = function(){
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
