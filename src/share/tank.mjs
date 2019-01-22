import Entity from './entity';

export default class Tank extends Entity{
  constructor(){
    this.name = "";
    this.color = {r:0,g:0,b:0};
    this.gunAngle = 0;
  }
}