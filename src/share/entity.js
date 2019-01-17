class Entity{
  constructor(){
    this.location = {x:0,y:0}
    this.velocity = {x:0,y:0}
    this.angle = 0;
  }
}

if (typeof module !== 'undefined')
module.exports = Entity;