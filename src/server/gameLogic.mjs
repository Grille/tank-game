import ByteBuffer from '../lib/byteBuffer.mjs';

import Game from '../share/game/game.mjs';
import Vehicle from '../share/vehicle.mjs';

export function startGame(){
  this.game = new Game();
  this.game.isServer=true;
  this.game.server = this;
  this.game.gameLoop();
  this.game.syncTimer();

  for (let i = 0; i < 128; i++) {
    this.game.objects[i] = {
      collision: [-4, 0, 0, 4, 4, 0, 0, -4],
      bounding: 8, id: i, typ: 0, location: { x: Math.random() * 512 - 256, y: Math.random() * 512 - 256 }, angle: Math.random() * 360
    }
  }
}