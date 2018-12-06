//let socket;
let server;
let gl2d;
let ground;

function main(){
  gl2d = new WebGL2DContext(canvas);
  loadData();

  startLocalGame();
}

function loadData(){
  ground = gl2d.textureFromFile("./assets/ground.png");
}

function startLocalGame(){
  startServer("local");
  startClient("local");
}
function joinGame(){

}