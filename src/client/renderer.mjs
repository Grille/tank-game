
import { WebGL2DContext, Matrix } from '../lib/webgl2D.mjs'

export function setRenderTraget(canvas) {
  this.canvas = canvas;
  this.gl2d = new WebGL2DContext(canvas);
}

export function render() {

  this.cam.x = this.tank[this.localID].x;
  this.cam.y = this.tank[this.localID].y;

  let gl2d = this.gl2d;
  gl2d.startScene();

  //this.drawGround();

  for (let i = 0;i<this.tank.length;i++){
    let tank = this.tank[i];
    this.drawTank(tank.x+200,tank.y+200,tank.angle,tank.angle,[80, 70, 150, 255]);
  }

  gl2d.endScene();
  gl2d.renderScene();

  let _this = this;
  setTimeout(() => { _this.render() }, 32);
}

export function drawGround(){
  let gl2d = this.gl2d;

  gl2d.matrix.scale(0.5, 0.5)
  let offsetX = this.cam.x % 64 - 64, offsetY = this.cam.y % 64 - 64;
  for (let ix = 0; ix < this.canvas.width / 64 + 1; ix++)
    for (let iy = 0; iy < this.canvas.height / 64 + 1; iy++)
      gl2d.drawImage(this.assets.ground, [0, 0, 64, 64], [ix * 64 + offsetX, iy * 64 + offsetY, 64, 64], [255, 255, 255, 255]);
  gl2d.matrix.reset();
}
export function drawTank(posX, posY, mainRot, towerRot, color) {
  let gl2d = this.gl2d;
  let assets = this.assets;
  
  gl2d.matrix.reset();

  gl2d.matrix.translate(-12, -22);
  gl2d.matrix.rotate(mainRot);
  gl2d.matrix.translate(posX, posY);
  gl2d.matrix.translate(-this.cam.x, -this.cam.y);
  gl2d.matrix.scale(2, 2)
  gl2d.drawImage(assets.tank0, [0, 0, 24, 45], [0, 0, 24, 45], [255, 255, 255, 255]);
  gl2d.drawImage(assets.tank1, [0, 0, 24, 45], [0, 0, 24, 45], [255, 255, 255, 255]);
  gl2d.drawImage(assets.tank2, [0, 0, 24, 45], [0, 0, 24, 45], color);
  gl2d.matrix.reset();
  gl2d.matrix.translate(-12, -22);
  gl2d.matrix.rotate(towerRot);
  gl2d.matrix.translate(posX, posY);
  gl2d.matrix.translate(-this.cam.x, -this.cam.y);
  gl2d.matrix.scale(2, 2)
  gl2d.drawImage(assets.tank3, [0, 0, 24, 45], [0, 0, 24, 45], color);
  gl2d.matrix.reset();

}

