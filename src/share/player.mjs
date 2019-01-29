export default class Player{
  constructor(name,color){
    this.name = name;
    this.team = null;
    this.color = color;
    this.vehicleID = null;
    this.socketID = null;
    this.eventMap = {
      key: { up: 0, down: 0, left: 0, right: 0 },
      mouse: { x: 0, y: 0 }
    }
    this.vehicle = null;
  }
}