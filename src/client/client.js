let cam ={x:0,y:0,z:0};
let objects = [];
let tanks = [];

function startClient(goal){
  
  updateCanvas();
  
  window.addEventListener("resize",updateCanvas);
  if (goal == "local"){
    socket = new LocalSocket(server);
  }
  
  socket.send("datadsfcds lol du aus dus");

  renderTimer();
}
function updateCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}