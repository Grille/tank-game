
let posX=200,posY=200;
let rot =0;
let tankRot = 0;
let speed = 0.1;

Client.prototype.logic = function(){

  //this.socket.send("2|"+this.keyDown[0]+'|'+this.keyDown[0]+'|'+this.keyDown[0]+'|'+this.keyDown[0]+'|'+this.keyDown[0]+'|')

  thrust = this.keyDown[38];
  speed*=0.99;
  if (this.keyDown[37]){
    tankRot-=0.5;
    speed -= 0.005;
    thrust = true;
  }
  if (this.keyDown[39]){
    tankRot+=0.5;
    speed -= 0.005;
    thrust = true;
  }
  if (thrust)speed += 0.01;
  if (this.keyDown[40])speed -= 0.005;

  rot = tankRot;//(rot*99 + tankRot)/100;

  posX += (speed*Math.sin(tankRot/180*Math.PI))
  posY -= (speed*Math.cos((tankRot)/180*Math.PI));

  let _this = this;
  setTimeout(()=>{_this.logic()}, 8);
}