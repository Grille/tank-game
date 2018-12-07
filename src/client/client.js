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

Client.prototype.setRenderTraget = function(canvas){
  this.gl2d = new WebGL2DContext(canvas);
}
Client.prototype.connect = function(goal){
  if (goal == "local"){
    this.socket = new LocalSocket(localServer);
    this.socket.send('0,'+"Grille");
  }
}
Client.prototype.start = function(){
  this.addEvents();
  this.logic();
  this.render();
}
Client.prototype.addEvents = function(){
  window.addEventListener("keydown",(e)=>{
    keyDown[e.keyCode] = true;
  });
  window.addEventListener("keyup",(e)=>{
    keyDown[e.keyCode] = false;
  });
}
