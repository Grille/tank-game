export function addPlayer(player){
  addEntity(this.players,player);
}

export function addVehicle(vehicle){
  addEntity(this.vehicles,vehicle);
}

export function addEntity(list,entity){
  for (let i = 0; i < list.length + 1; i++) {
    if (list[i] == null || list[i] == void 0) {
      list[i] = entity
      break;
    }
  }
}

export function setEntity(list,entity,id){
  list[id] = entity;
}

