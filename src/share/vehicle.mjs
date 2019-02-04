import Entity from './entity.mjs';

export default class Vehicle extends Entity{
  constructor(){
    super();
    this.class = null;
    this.alive = true;
    this.color = {r:255,g:255,b:255};
    this.gunAngle = 45;
    this.owner = null;
  }
}