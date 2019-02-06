export default class Entity{
  constructor(){
    this.typ = null;
    this.hp = -1;
    this.location = {x:0,y:0}
    this.velocity = {x:0,y:0}
    this.angle = 0;
    this.bounding = 0;
    this.collision = [0,0];
  }
}