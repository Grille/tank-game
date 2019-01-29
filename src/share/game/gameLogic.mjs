
export function gameLoop(){
  //console.log("LOOP");
  this.gameLogic();
  let _this = this;
  setTimeout(()=>{_this.gameLoop()}, 8);
}
export function gameLogic() {
  for (let i = 0;i<this.players.length;i++) {
    let player = this.players[i];
    if (player == null)continue; 
    //console.log("player"+player.name);
    let eventMap = player.eventMap;
    let vehicle = player.vehicle;
    if (vehicle!=null){
      let thrust = eventMap.key.up;
      vehicle.speed *= 0.99;
      if (eventMap.key.left) {
        vehicle.angle -= 0.5;
        vehicle.speed -= 0.005;
        vehicle.speed *= 0.99;
        thrust = true;
      }
      if (eventMap.key.right) {
        vehicle.angle += 0.5;
        vehicle.speed -= 0.005;
        vehicle.speed *= 0.99;
        thrust = true;
      }
      if (thrust) vehicle.speed += 0.01;
      if (eventMap.key.down) vehicle.speed -= 0.005;
    }
  }
  for (let i = 0;i<this.vehicles.length;i++){
    let vehicle = this.vehicles[i];
    if (vehicle == null)continue; 
    console.log("id:" + i+" owner:"+vehicle.owner.name+" x:"+(vehicle.x|0)+" y:"+(vehicle.y|0)+" s:"+(vehicle.speed))
    vehicle.x += (vehicle.speed * Math.sin(vehicle.angle / 180 * Math.PI))
    vehicle.y -= (vehicle.speed * Math.cos((vehicle.angle) / 180 * Math.PI));
  }
  /*
  for (let i = 0;i<this.vehicles.length;i++){
    let vehicle = this.vehicles[i];
    if (vehicle == null)continue; 

    let data = new ByteBuffer();
    data.writeUint8(2)
    data.writeUint8(i)
    data.writeFloat32(tank.x)
    data.writeFloat32(tank.y)
    data.writeFloat32(tank.angle)
    data.writeFloat32(tank.speed)
    this.sendData(data);
  }
  */
}