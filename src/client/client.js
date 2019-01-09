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
    this.socket;
    this.gl2d;
  }
}


/*
let pingTimeout = null;
const socket = new WebSocket('ws://localhost:51942/');
//wss://somurl.com/
socket.binaryType = 'arraybuffer'
socket.addEventListener('open', (event) => {
  console.log("connected succesfully");
  //connect(socket);
  //heartbeat(socket);

  socket.send(pong());
});

socket.addEventListener('close', (event) => {
  console.log("disconnected...");
  clearTimeout(pingTimeout);
});
socket.addEventListener('error', (event) => {
  console.log("an error has occured!");
});

socket.addEventListener('message', (event) => {
  heartbeat(socket);
  //console.log(event.data)
  const array = new Uint8Array(event.data);
  const buf = array.buffer;
  const dv = new DataView(buf);
  //console.log(array[0])

  
  switch (array[0]) {
    case PING:
      socket.send(pong());
      console.log("server ping");
      break;
    case PONG:
      console.log("server responded");
      break;
    default:
      console.log("response not found", event.data);
  }
  

});

function heartbeat(server) {
  clearTimeout(pingTimeout);

  // Delay should be
  // equal to the interval at which your server sends out pings plus a
  // conservative assumption of the latency.
  pingTimeout = setTimeout(() => {
    server.close();
  }, 30000 + 1000);
}
*/
function pong() {
  const array = new Uint8Array(1);
  array[0] = 42;
  return array.buffer;
}


Client.prototype.setRenderTraget = function(canvas){
  this.gl2d = new WebGL2DContext(canvas);
}
Client.prototype.connect = function(url){
  let socket = this.socket = new WebSocket(url);
  socket.onopen = function(e){
    let buffer = new ByteBuffer();
    buffer.writeUInt8(42);
    buffer.writeString("hallo");
    socket.send(buffer.getBuffer());
  }

}
Client.prototype.start = function(){
  this.addEvents();
  this.logic();
  this.render();
}
Client.prototype.addEvents = function(){
  let _this = this;
  window.addEventListener("keydown",(e)=>{
    console.log(e.keyCode);
    _this.keyDown[e.keyCode] = true;
  });
  window.addEventListener("keyup",(e)=>{
    _this.keyDown[e.keyCode] = false;
  });
}
