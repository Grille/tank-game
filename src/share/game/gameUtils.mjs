import ByteBuffer from '../../lib/byteBuffer.mjs'

export function addPlayer(player){
  for (let i = 0; i < this.players.length + 1; i++) {
    if (this.players[i] == null || this.players[i] == void 0) {
      player.id = i;
      this.players[i] = player
      break;
    }
    else if (this.players[i].name == player.name){
      player = this.players[i];
    }
  }
  return player;
}

export function addVehicle(vehicle){
  return this.addEntity(this.vehicles,vehicle);
}
export function genChunkKey(location){
  return ('x' + ((location.x / 128) | 0) + 'y' + ((location.y / 128) | 0)).replace('-','n',).replace('-','n',);
}
export function chunkifyObject(object) {
  for (let ix = -1;ix<=1;ix++){
    for (let iy = -1;iy<=1;iy++){
      let key = genChunkKey({x:object.location.x+ix,y:object.location.y+iy});
      if (this.chunks[key] === undefined) {
        this.chunks[key] = {
          objects: []
        }
      }
      this.chunks[key].objects.push(object);
    }
  }
}
export function chunkifyObjects() {
  this.chunks = {};
  for (let i = 0; i < this.objects.length; i++) {
    let object = this.objects[i];
    if (object !== null) {
      this.chunkifyObject(object);
    }
  }
}


export function addProjectile(projectile){
  return this.addEntity(this.projectiles,projectile);
}

export function spawnEffect(typ,location,velocity,livetime,size){
  if (size==null)size=1;
  let effect = {typ,location,velocity,livetime,size};
  if (this.isServer){
    this.syncEffect(effect);
  }
  else{
    effect.birth = Date.now();
    this.addEntity(this.effects,effect)
  }
}
export function addEntity(list,entity){
  for (let i = 0; i < list.length + 1; i++) {
    if (list[i] == null || list[i] == void 0) {
      entity.id = i;
      list[i] = entity
      list.count++;
      return i;
    }
  }
}

export function setEntity(list,entity,id){
  list[id] = entity;
}

