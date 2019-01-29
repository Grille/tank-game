import ByteBuffer from '../lib/byteBuffer.mjs';

import Game from '../share/game/game.mjs';

export function startGame(){
  this.game = new Game();
  this.game.gameLoop();
}