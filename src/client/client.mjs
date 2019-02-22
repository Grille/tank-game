import extend from '../extend.mjs'

import Game from '../share/game/game.mjs'

import * as _chat from './chat.mjs';
import * as _utils from './utils.mjs';
import * as _network from './network.mjs';
import * as _render from './renderer.mjs';


export default class Client {
  constructor() {
    this.effecCount = 0;
    this.canvas;
    this.gl2d;
    this.cam = { x: 0, y: 0, scale:0.8,vx:0,vy:0,z: 0 }
    this.assets=null;
    this.stats = {renderTime:0}
    this.game;
    this.localID=0;
    this.keyDown = [];
    this.mouseEvent = new MouseEvent("");
    this.socket = {
      readyState: 0
    }
    this.eventMap = {
      key: {up: 0,down: 0,left: 0,right: 0},
      mouse: { angle: 0, distance: 0 ,leftDown:0,rightDown:0}
    }
  }
}
Client.prototype.start = function () {
  this.game=new Game();
  this.game.gameLoop();
  console.log("load: ")
  this.game.assets.enableGraphics = true;
  this.game.assets.gl2d = this.gl2d;
  this.game.assets.loadFile = (path) => {
    console.log("load: "+path)
    let request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send();
    return request.responseText;
  };
  this.game.assets.loadData("../../../assets/");

  window.game = this.game;
  console.log("start");
  this.addEvents();
  this.initChat();
  this.addEventsControls();

  //this.logic();
  //this.render();
}

extend(Client, _chat)
extend(Client, _utils)
extend(Client, _network)
extend(Client, _render)