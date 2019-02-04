import ByteBuffer from '../lib/byteBuffer.mjs';

import Game from '../share/game/game.mjs';
import Vehicle from '../share/vehicle.mjs';

export function startGame(){
  this.game = new Game();
  this.game.isServer=true;
  this.game.server = this;
  this.game.gameLoop();
  this.game.syncTimer();

  let vehicle = new Vehicle();
  vehicle.location.x = 32;
  vehicle.location.y = 10;
  vehicle.angle = 45;
  vehicle.gunAngle = 30;
  vehicle.color = {r:10,g:100,b:40};
  this.game.addVehicle(vehicle);
}