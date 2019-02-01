import extend from '../extend.mjs'

import Game from '../share/game/game.mjs'

import * as _chat from './chat.mjs';
import * as _utils from './utils.mjs';
import * as _render from './renderer.mjs';


export default class Client {
  constructor() {
    this.canvas;
    this.gl2d;
    this.cam = { x: 0, y: 0, vx:0,vy:0,z: 0 }
    this.assets=null;
    this.stats = {renderTime:0}
    this.game=new Game();
    this.game.gameLoop();
    this.localID=0;
    this.keyDown = [];
    this.socket = {
      readyState: 0
    }
    this.eventMap = {
      key: {up: 0,down: 0,left: 0,right: 0},
      mouse: {x: 0,y: 0}
    }
  }
}
Client.prototype.start = function () {
  console.log("start");
  this.addEvents();
  this.initChat();
  this.addEventsKeyMouse();

  //this.logic();
  //this.render();
}

extend(Client, _chat)
extend(Client, _utils)
extend(Client, _render)