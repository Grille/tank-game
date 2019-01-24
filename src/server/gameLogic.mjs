import ByteBuffer from '../share/byteBuffer.mjs';

export function gameLoop(){
  //console.log("LOOP");
  this.gameLogic();
  let _this = this;
  setTimeout(()=>{_this.gameLoop()}, 8);
}
export function addTank(){

}
export function gameLogic() {

  for (let i = 0; i < this.connections.length; i++) {
    if (this.connections[i] != null && this.connections[i] != void 0) {
      let tank = this.tank[i];
      let eventMap = this.eventMap[i];
      let thrust = eventMap.key.up;
      tank.speed *= 0.99;
      if (eventMap.key.left) {
        tank.angle -= 0.5;
        tank.speed -= 0.005;
        tank.speed *= 0.99;
        thrust = true;
      }
      if (eventMap.key.right) {
        tank.angle += 0.5;
        tank.speed -= 0.005;
        tank.speed *= 0.99;
        thrust = true;
      }
      if (thrust) tank.speed += 0.01;
      if (eventMap.key.down) tank.speed -= 0.005;

      tank.x += (tank.speed * Math.sin(tank.angle / 180 * Math.PI))
      tank.y -= (tank.speed * Math.cos((tank.angle) / 180 * Math.PI));

      let data = new ByteBuffer();
      data.writeUint8(2)
      data.writeUint8(i)
      data.writeFloat32(tank.x)
      data.writeFloat32(tank.y)
      data.writeFloat32(tank.angle)
      data.writeFloat32(tank.speed)
      this.sendData(data);
    }
  }

  /*
  if (this.eventMap.key.up) this.velocity.y -= 0.01;
  if (this.eventMap.key.down) this.velocity.y += 0.01;
  if (this.eventMap.key.right) this.velocity.x += 0.01;
  if (this.eventMap.key.left) this.velocity.x -= 0.01;

  this.velocity.x*=0.99;
  this.velocity.y*=0.99;

  this.location.x += this.velocity.x;
  this.location.y += this.velocity.y;
*/

  //console.log(this.location);

}