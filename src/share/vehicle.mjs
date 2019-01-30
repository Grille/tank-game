import Entity from './entity.mjs';

export default class Vehicle extends Entity{
  constructor(){
    super();
    this.speed = 0;
    this.name = "";
    this.alive = true;
    this.color = {r:255,g:255,b:255};
    this.gunAngle = 0;
    this.owner = null;
    this.class = null;
    this.eventMap = {
      key: { up: 0, down: 0, left: 0, right: 0 },
      mouse: { x: 0, y: 0 }
    }
  }
}