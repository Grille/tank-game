import Client from './client.mjs'

let client;
let gl2d;
let assets;

console.log("init main()");

function main() {
  updateCanvas();
  window.addEventListener("resize", updateCanvas);
  //gl2d = new WebGL2DContext(canvas);
  //loadData();

  startLocalGame();
  console.log("main()");
}

function updateCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function loadData() {
  let gl2d = client.gl2d;
  client.assets = {
    ground: gl2d.textureFromFile("./assets/ground.png"),
    tank0: gl2d.textureFromFile("./assets/tankChassis.png"),
    tank1: gl2d.textureFromFile("./assets/tankBottom.png"),
    tank2: gl2d.textureFromFile("./assets/tankPlating.png"),
    tank3: gl2d.textureFromFile("./assets/tankTower.png")
  }
}

function startLocalGame() {
  client = new Client();
  client.connect('ws://localhost:51942/');
  client.setRenderTraget(canvas);
  loadData()
  client.start();

}

window.onload = main;

