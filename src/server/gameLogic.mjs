import fs from 'fs'
import ByteBuffer from '../lib/byteBuffer.mjs';

import Game from '../share/game/game.mjs';
import Vehicle from '../share/vehicle.mjs';

export function startGame(){
  if (this.game != null)this.game.timer.stop();
  this.game = new Game();
  this.game.isServer=true;
  this.game.server = this;
  this.game.assets.loadFile = (path) => {
    this.consoleLog("load: " + path); 
    return fs.readFileSync(path, 'utf8');
  }
  this.game.assets.loadData("../../assets/");
  this.game.gameLoop();
  this.game.syncTimer();


/*
  let roadLocation = { x: 0, y: 0 }, angle = 0;
  for (let i = 0; i < 16; i++) {
    //angle += 40*Math.random()-20;
    if (angle>360)angle-=360
    if (angle<0)angle+=360
    roadLocation.x +=(64 * Math.sin(angle / 180 * Math.PI))
    roadLocation.y -=(64 * Math.cos((angle) / 180 * Math.PI));
    this.game.objects[i] = {
      collision: [-4, 0, 0, 4, 4, 0, 0, -4],
      bounding: 8, id: i, typ: 1, location: { x: roadLocation.x, y: roadLocation.y}, angle: angle
    }
    this.game.chunkifyObjects();
  }

  */
  let size = 16384;
  for (let i = 0; i < 60000; i++) {
    this.game.objects[i] = {
      collision: [-4, 0, 0, 4, 4, 0, 0, -4],
      bounding: 8, id: i, typ: 0, location: { x: Math.random() * size - size/2, y: Math.random() * size - size/2 }, angle: Math.random() * 360
    }
  }
  this.game.chunkifyObjects();
  

}