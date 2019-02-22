export default class Player{
  constructor(name,color){
    this.connected = false;
    this.name = name!=null?name:"#name";
    this.team = null;
    this.color = color!=null?color:{r:255,g:255,b:255};
    this.eventMap = {
      key: { up: 0, down: 0, left: 0, right: 0 },
      mouse: { angle: 0, distance: 0 ,leftdown:0,rightdown:0,leftclick:0,rightclick:0}
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
