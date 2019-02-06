import ByteBuffer from '../lib/byteBuffer.mjs';

import Game from '../share/game/game.mjs';
import Vehicle from '../share/vehicle.mjs';

export function startGame(){
  this.game = new Game();
  this.game.isServer=true;
  this.game.server = this;
  this.game.gameLoop();
  this.game.syncTimer();
}