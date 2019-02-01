import Entity from './entity.mjs';

export default class Vehicle extends Entity{
  constructor(){
    super();
    this.class = null;
    this.speed = 0;
    this.alive = true;
    this.color = {r:255,g:255,b:255};
    this.gunAngle = 0;
    this.owner = null;
  }
}