
import { WebGL2DContext, Matrix } from '../lib/webgl2D.mjs'

export function setRenderTraget(canvas) {
  this.canvas = canvas;
  this.gl2d = new WebGL2DContext(canvas);
}

export function render() {
  let date = Date.now();
  const RED = [255, 0, 0, 255];
  const BLUE = [0, 0, 255, 255];
  let gl2d = this.gl2d;
  gl2d.startScene();
  this.drawGround();

  if (this.game.players[this.localID] != null) {
    let localVehicle = this.game.players[this.localID].vehicle;
    if (localVehicle != null) {
      //this.cam.vx = localVehicle.velocity.x;
      //this.cam.vy = localVehicle.velocity.y;
      this.cam.x += this.cam.vx;
      this.cam.y += this.cam.vy;
      this.cam.x = (localVehicle.location.x-canvas.width/2);
      this.cam.y = (localVehicle.location.y-canvas.height/2);
    }
  }

  for (let i = 0;i<this.game.vehicles.length;i++){
    let vehicle = this.game.vehicles[i];
    if (vehicle==null)continue;
    let color = [vehicle.color.r,vehicle.color.g,vehicle.color.b,255];
    this.drawTank(vehicle.location.x,vehicle.location.y,vehicle.angle,vehicle.angle,color);
  }
/*
  this.cam.x = this.tank[this.localID].x;
  this.cam.y = this.tank[this.localID].y;

  
  

  //this.drawGround();

  for (let i = 0;i<this.tank.length;i++){
    let tank = this.tank[i];
    this.drawTank(tank.x+200,tank.y+200,tank.angle,tank.angle,[80, 70, 150, 255]);
  }

  

  
  */
  gl2d.endScene();
  gl2d.renderScene();

  this.stats.renderTime=Date.now()-date;
  let _this = this;
  setTimeout(() => { _this.render() }, 16);
}

export function drawGround(){
  let gl2d = this.gl2d;

  gl2d.matrix.scale(1, 1)
  let size = 128;
  let offsetX = this.cam.x % size - size, offsetY = this.cam.y % size - size;
  for (let ix = -2; ix < this.canvas.width / size + 1; ix++)
    for (let iy = -2; iy < this.canvas.height / size + 1; iy++)
      gl2d.drawImage(this.assets.ground, [0, 0, 64, 64], [ix * size - offsetX, iy * size - offsetY, size, size], [255, 255, 255, 255]);
  gl2d.matrix.reset();
}

export function drawTank(posX, posY, mainRot, towerRot, color) {
  let gl2d = this.gl2d;
  let assets = this.assets;
  
  gl2d.matrix.reset();

  gl2d.matrix.translate(-12, -22);
  gl2d.matrix.rotate(mainRot);
  gl2d.matrix.scale(2, 2)
  gl2d.matrix.translate(posX, posY);
  gl2d.matrix.translate(-this.cam.x, -this.cam.y);
  gl2d.drawImage(assets.tank0, [0, 0, 24, 45], [0, 0, 24, 45], [255, 255, 255, 255]);
  gl2d.drawImage(assets.tank1, [0, 0, 24, 45], [0, 0, 24, 45], [255, 255, 255, 255]);
  gl2d.drawImage(assets.tank2, [0, 0, 24, 45], [0, 0, 24, 45], color);
  gl2d.matrix.reset();

  gl2d.matrix.translate(-12, -22);
  gl2d.matrix.rotate(towerRot);
  gl2d.matrix.scale(2, 2)
  gl2d.matrix.translate(posX, posY);
  gl2d.matrix.translate(-this.cam.x, -this.cam.y);
  gl2d.drawImage(assets.tank3, [0, 0, 24, 45], [0, 0, 24, 45], color);
  gl2d.matrix.reset();

}

