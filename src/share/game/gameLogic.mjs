import ByteBuffer from '../../lib/byteBuffer.mjs'
import Vehicle from '../vehicle.mjs';

export function gameLoop() {
  //console.log("LOOP");
  this.timer.start();
}
export function reset(){
  this.players = [];
  this.vehicles = [];
  this.effects = [];
  this.projectiles = [];
}
export function gameLogic() {


  for (let i = 0; i < this.players.length; i++) {
    let player = this.players[i];
    if (player == null) continue;
    let eventMap = player.eventMap;
    let vehicle = player.vehicle;
    let speed = Math.sqrt(Math.pow(Math.abs(vehicle.velocity.x), 2) + Math.pow(Math.abs(vehicle.velocity.y), 2));
    if (vehicle != null) {
      let angleDiff = Math.abs(vehicle.gunAngle - eventMap.mouse.angle);
      if (angleDiff > 180) {
        if (vehicle.gunAngle > eventMap.mouse.angle + 0.8)
          vehicle.gunAngle += 0.6;
        else if (vehicle.gunAngle < eventMap.mouse.angle - 0.8)
          vehicle.gunAngle -= 0.6;
      }
      else {
        if (vehicle.gunAngle < eventMap.mouse.angle - 0.8)
          vehicle.gunAngle += 0.6;
        else if (vehicle.gunAngle > eventMap.mouse.angle + 0.8)
          vehicle.gunAngle -= 0.6;
      }
      if (vehicle.gunAngle > 360) vehicle.gunAngle -= 360
      if (vehicle.gunAngle < 0) vehicle.gunAngle += 360
      let thrust = eventMap.key.up || eventMap.key.down;
      speed *= 0.99;

      if (eventMap.mouse.leftclick == 1){
        eventMap.mouse.leftclick = 2;
        if (this.isServer){
          let nvehicle = new Vehicle();
          nvehicle.location.x = vehicle.location.x;
          nvehicle.location.y = vehicle.location.y;
          nvehicle.velocity.x = +(2 * Math.sin(vehicle.gunAngle / 180 * Math.PI))
          nvehicle.velocity.y = -(2 * Math.cos((vehicle.gunAngle) / 180 * Math.PI));
          nvehicle.angle = vehicle.gunAngle;
          nvehicle.gunAngle = vehicle.gunAngle;

          this.addVehicle(nvehicle)
          this.syncObject(20,nvehicle)
        }
        //console.log("leftclick !!!!!!!!!!")
      }
      if (eventMap.mouse.rightclick == 1){
        eventMap.mouse.rightclick = 2;
      }

      if (eventMap.key.left) {
        vehicle.angle -= 0.5;
        vehicle.gunAngle -= 0.5;
        speed += 0.005;
        speed *= 0.98;
        thrust = false;
      }
      if (eventMap.key.right) {
        vehicle.angle += 0.5;
        vehicle.gunAngle += 0.5;
        speed += 0.005;
        speed *= 0.98;
        thrust = false;
      }
      if (thrust) speed += 0.01;
      if (eventMap.key.down) speed = -0.3;
      //if (Math.abs(speed)<=0.001)speed=0;

      vehicle.velocity.x = +(speed * Math.sin(vehicle.angle / 180 * Math.PI))
      vehicle.velocity.y = -(speed * Math.cos((vehicle.angle) / 180 * Math.PI));
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