import ByteBuffer from '../../lib/byteBuffer.mjs'
export function gameLoop() {
  //console.log("LOOP");
  this.timer.start();
}
export function gameLogic() {


  for (let i = 0; i < this.players.length; i++) {
    let player = this.players[i];
    if (player == null) continue;
    let eventMap = player.eventMap;
    let vehicle = player.vehicle;
    if (vehicle != null) {
      let thrust = eventMap.key.up || eventMap.key.down;
      vehicle.speed *= 0.99;
      if (eventMap.key.left) {
        vehicle.angle -= 0.5;
        vehicle.speed += 0.005;
        vehicle.speed *= 0.98;
        thrust = false;
      }
      if (eventMap.key.right) {
        vehicle.angle += 0.5;
        vehicle.speed += 0.005;
        vehicle.speed *= 0.98;
        thrust = false;
      }
      if (thrust) vehicle.speed += 0.01;
      if (eventMap.key.down) vehicle.speed -= 0.02;
      if (Math.abs(vehicle.speed)<=0.01)vehicle.speed=0;
      vehicle.velocity.x = +(vehicle.speed * Math.sin(vehicle.angle / 180 * Math.PI))
      vehicle.velocity.y = -(vehicle.speed * Math.cos((vehicle.angle) / 180 * Math.PI));
    }
  }


  for (let i = 0; i < this.vehicles.length; i++) {
    let vehicle = this.vehicles[i];
    if (vehicle == null) continue;
    //console.log(vehicle.velocity.x);
    vehicle.location.x += vehicle.velocity.x; vehicle.location.y += vehicle.velocity.y;
  }
}

export function syncTimer() {
  if (this.isServer) {
    this.syncList(92);
    //for (let i = 0; i < this.vehicles.length; i++)
    //this.syncObject(20,this.vehicles[i])
    //for (let i = 0; i < this.players.length; i++)
    //this.server.sendData(this.packData(10, this.players[i]));
    let _this = this;
    setTimeout(() => { _this.syncTimer() }, 250);
  }
}