
//let socket;
let localServer;
let gl2d;
let assets;

function main(){
  updateCanvas();
  window.addEventListener("resize",updateCanvas);

  gl2d = new WebGL2DContext(canvas);
  loadData();

  startLocalGame();
}

function updateCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function loadData(){
  assets = {
    ground : gl2d.textureFromFile("./assets/ground.png"),
    tank0 : gl2d.textureFromFile("./assets/tankChassis.png"),
    tank1 : gl2d.textureFromFile("./assets/tankBottom.png"),
    tank2 : gl2d.textureFromFile("./assets/tankPlating.png"),
    tank3 : gl2d.textureFromFile("./assets/tankTower.png")
  }
}

function startLocalGame(){
  startServer("local");
  let client = new Client();
  client.connect("local");
  client.setRenderTraget(canvas);
  client.start();
}
function joinGame(){

}