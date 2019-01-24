import extend from '../extend.mjs'

import * as _chat from './chat.mjs';
import * as _utils from './utils.mjs';
import * as _render from './renderer.mjs';

export default class Client {
  constructor() {
    this.cam = { x: 0, y: 0, z: 0 }
    this.objects = [];
    this.tanks = [];
    this.assets;
    this.localID=0;
    this.keyDown = [];
    this.socket = {
      readyState: 0
    }
    this.tank = [{ id:0,x: 0, y: 0,angle:0,speed:0 },{ id:0,x: 0, y: 0,angle:0,speed:0 }]

    this.canvas;
    this.gl2d;
    this.eventMap = {
      key: {
        up: 0,
        down: 0,
        left: 0,
        right: 0
      },
      mouse: {
        x: 0,
        y: 0
      }
    }
  }
}
Client.prototype.start = function () {
  console.log("start");
  this.addEvents();
  this.initChat();
  this.addEventsKeyMouse();
  this.render();
  //this.logic();
  //this.render();
}

extend(Client, _chat)
extend(Client, _utils)
extend(Client, _render)