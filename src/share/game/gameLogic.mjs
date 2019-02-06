import ByteBuffer from '../../lib/byteBuffer.mjs'
import Vehicle from '../vehicle.mjs';
import Entity from '../entity.mjs';

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

  let poly = [{x:1,y:0},{x:1,y:0},{x:1,y:0},{x:1,y:0}]

  for (let i = 0; i < this.players.length; i++) {
    let player = this.players[i];
    if (player == null) continue;
    let eventMap = player.eventMap;
    let vehicle = player.vehicle;
    if (vehicle != null) {
      let speed = Math.sqrt(Math.pow(Math.abs(vehicle.velocity.x), 2) + Math.pow(Math.abs(vehicle.velocity.y), 2));
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
      let thrust = eventMap.key.up;

      
      if (eventMap.mouse.leftclick == 1){
        eventMap.mouse.leftclick = 2;
        if (this.isServer){
          let nprojectile = new Entity();
          nprojectile.location.x = vehicle.location.x+(22 * Math.sin(vehicle.gunAngle / 180 * Math.PI));
          nprojectile.location.y = vehicle.location.y-(22 * Math.cos((vehicle.gunAngle) / 180 * Math.PI));
          nprojectile.velocity.x = +(4 * Math.sin(vehicle.gunAngle / 180 * Math.PI)) +vehicle.velocity.x + (Math.random()*-0.5)
          nprojectile.velocity.y = -(4 * Math.cos((vehicle.gunAngle) / 180 * Math.PI)) +vehicle.velocity.y+ (Math.random()*-0.5)

          this.spawnEffect(0,nprojectile.location,vehicle.velocity,500);
          this.addProjectile(nprojectile)
          this.syncObject(30,nprojectile)
        }
        //console.log("leftclick !!!!!!!!!!")
      }
      if (eventMap.mouse.rightclick == 1){
        eventMap.mouse.rightclick = 2;
      }

      if (eventMap.key.left) {
        vehicle.angle -= 0.5;
        vehicle.gunAngle -= 0.5;
        //speed += 0.005;
        //speed *= 0.98;
        thrust = false;
      }
      if (eventMap.key.right) {
        vehicle.angle += 0.5;
        vehicle.gunAngle += 0.5;
        //speed += 0.005;
        //speed *= 0.98;
        thrust = false;
      }
      if (thrust) {
        speed += 0.01;

      }
      if (!this.isServer && speed > 0.2 && Math.random() <= 0.1) 
      this.spawnEffect(1,{x:vehicle.location.x,y:vehicle.location.y},{x:0,y:0},2000);
      //if (eventMap.key.down) speed = -0.3;
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
    vehicle.velocity.x*=0.99;vehicle.velocity.y*=0.99;
  }

  for (let i = 0; i < this.effects.length; i++) {
    let effect = this.effects[i];
    if (effect == null) continue;
    effect.location.x += effect.velocity.x; effect.location.y += effect.velocity.y;
    if (Date.now()>effect.birth + effect.livetime){
      this.effects[i] = null;
    }
  }

  for (let i = 0; i < this.projectiles.length; i++) {
    let projectile = this.projectiles[i];
    if (projectile == null) continue;
    //console.log(vehicle.velocity.x);
    projectile.location.x += projectile.velocity.x; projectile.location.y += projectile.velocity.y;
    projectile.velocity.x *= 0.992; projectile.velocity.y *= 0.992;
    if (this.isServer) {
      let speed = Math.sqrt(Math.pow(Math.abs(projectile.velocity.x), 2) + Math.pow(Math.abs(projectile.velocity.y), 2));
      if (speed < 2) {
        this.syncObject(31, projectile)
        this.spawnEffect(1,projectile.location,{x:0,y:0},5000);
        this.spawnEffect(0,projectile.location,{x:0,y:0},500);
        this.projectiles[i] = null;
      }
    }
  }

  for (let i1 = 0; i1 < this.vehicles.length; i1++) {
    for (let i2 = i1+1; i2 < this.vehicles.length; i2++) {
      let vehicle1 = this.vehicles[i1], vehicle2 = this.vehicles[i2];
      if (this.entityColision(vehicle1, vehicle2)) {
        //vehicle1.location.x += vehicle1.velocity.x / 2 + vehicle2.velocity.x / 2;
        //vehicle1.location.y += vehicle1.velocity.y / 2 + vehicle2.velocity.y / 2;
      }
    }
  }
  if (this.isServer) {
    for (let i1 = 0; i1 < this.vehicles.length; i1++) {
      for (let i2 = 0; i2 < this.projectiles.length; i2++) {
        let vehicle = this.vehicles[i1], projectile = this.projectiles[i2];
        if (this.entityColision(vehicle, projectile)) {
          vehicle.location.x += projectile.velocity.x;
          vehicle.location.y += projectile.velocity.y;
          this.syncObject(31, projectile)
          this.syncObject(20, vehicle)
          this.spawnEffect(0, projectile.location, { x: 0, y: 0 }, 500);
          this.projectiles[i2] = null;
        }
      }
    }
  }
}


