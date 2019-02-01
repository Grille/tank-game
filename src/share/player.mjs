export default class Player{
  constructor(name,color){
    this.name = name!=null?name:"name";
    this.team = null;
    this.color = color!=null?color:{r:255,g:255,b:255};
    this.eventMap = {
      key: { up: 0, down: 0, left: 0, right: 0 },
      mouse: { x: 0, y: 0 }
    }
    this._vehicle = null;
  }
  set vehicle(vehicle){
    this._vehicle = vehicle;
    if (vehicle == null) return;
    this._vehicle.owner = this;
    this._vehicle.color = this.color;
  }
  get vehicle(){
     return this._vehicle;
  }
}