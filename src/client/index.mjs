import Client from './client.mjs'
import Timer from '../share/timer.mjs'
import { addProjectile } from '../share/game/gameUtils.mjs';

let client;
let gl2d;
let assets;

console.log("init main()");

function main() {
  updateCanvas();
  'ws://localhost:8080/'
  let addrss = 'ws://'+window.location.host+':8080';
  window.addEventListener("resize", updateCanvas);
  client = new Client();
  client.setRenderTraget(canvas);
  loadData()
  client.connect(addrss);
  client.start();
  client.render();
  html_inputName.value = '#'+btoa((Math.random()*999)|0);
  html_btnJG.onclick = (e)=>{
    let color = html_inputColor.value.match(/[A-Za-z0-9]{2}/g);
    color = color.map(function (v) { return parseInt(v, 16) });

    client.join(html_inputName.value,{r:color[0],g:color[1],b:color[2]})


  }
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
    tank3: gl2d.textureFromFile("./assets/tankTower.png"),
    projectile: gl2d.textureFromFile("./assets/projectile.png"),
    fire: gl2d.textureFromFile("./assets/fire.png"),
    dust: gl2d.textureFromFile("./assets/dust.png"),
    tree: gl2d.textureFromFile("./assets/tree.png")
  }
}

window.onload = main;

