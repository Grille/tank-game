
import { WebGL2DContext, Matrix } from '../lib/webgl2D.mjs'

export function setRenderTraget(canvas) {
  this.canvas = canvas;
  this.gl2d = new WebGL2DContext(canvas);
  this.gl2d.nullTexture = this.gl2d.textureFromPixelArray(new Uint8Array([255,255,255,100]),1,1)
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
      this.cam.x = (localVehicle.location.x-canvas.width/(2*this.cam.scale));
      this.cam.y = (localVehicle.location.y-canvas.height/(2*this.cam.scale));
    }
  }

  for (let i = 0; i < this.game.effects.length; i++) {
    let effect = this.game.effects[i];
    if (effect == null || effect.typ != 1) continue;
    this.drawEffect(effect)
  }
  for (let i = 0; i < this.game.vehicles.length; i++) {
    let vehicle = this.game.vehicles[i];
    if (vehicle == null) continue;
    let color = [vehicle.color.r, vehicle.color.g, vehicle.color.b, 255];
    this.drawTank(vehicle.location, vehicle.angle, vehicle.gunAngle, color);
  }
  for (let i = 0; i < this.game.vehicles.length; i++) {
    let vehicle = this.game.vehicles[i];
    if (vehicle == null) continue;
    let color = [vehicle.color.r, vehicle.color.g, vehicle.color.b, 255]; 
    this.drawTankTurret(vehicle.location, vehicle.gunAngle, color);
  }
  for (let i = 0; i < this.game.projectiles.length; i++) {
    let projectile = this.game.projectiles[i];
    if (projectile == null) continue;
    this.drawProjectile(projectile.location)
  }
  for (let i = 0; i < this.game.effects.length; i++) {
    let effect = this.game.effects[i];
    if (effect == null || effect.typ != 0) continue;
    this.drawEffect(effect)
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

  gl2d.matrix.scale(this.cam.scale, this.cam.scale)
  let size = 64;
  let offsetX = this.cam.x % size - size, offsetY = this.cam.y % size - size;
  for (let ix = -2; ix < (this.canvas.width / size)/this.cam.scale + 1; ix++)
    for (let iy = -2; iy < (this.canvas.height / size)/this.cam.scale + 1; iy++)
      gl2d.drawImage(this.assets.ground, [0, 0, 64, 64], [ix * size - offsetX, iy * size - offsetY, size, size], [255, 255, 255, 255]);
  gl2d.matrix.reset();
}

export function drawEffect(effect){
  let gl2d = this.gl2d;
  let assets = this.assets;
  
  gl2d.matrix.reset();

  let progress = (((Date.now() - effect.birth) / effect.livetime));

  if (effect.typ == 0) {
    gl2d.matrix.translate(-8, -8);
    gl2d.matrix.rotate(Math.random() * 360);
    gl2d.matrix.scale(this.cam.scale * (progress + 1), this.cam.scale * (progress + 1))
    gl2d.matrix.translate((effect.location.x - this.cam.x) * this.cam.scale, (effect.location.y - this.cam.y) * this.cam.scale);
    gl2d.drawImage(assets.fire, [0, 0, 16, 16], [0, 0, 16, 16], [255, 255, 255, (1 - progress) * 255]);
  } else {
    gl2d.matrix.translate(-8, -8);
    gl2d.matrix.scale(this.cam.scale * (progress*2 + 1), this.cam.scale * (progress*2 + 1))
    gl2d.matrix.translate((effect.location.x - this.cam.x) * this.cam.scale, (effect.location.y - this.cam.y) * this.cam.scale);
    gl2d.drawImage(assets.dust, [0, 0, 16, 16], [0, 0, 16, 16], [255, 255, 255, (1 - progress) * 40]);
  }
  gl2d.matrix.reset();
}
export function drawProjectile(location,velocity){
  let gl2d = this.gl2d;
  let assets = this.assets;
  
  gl2d.matrix.reset();

  gl2d.matrix.translate(-2, -2);
  gl2d.matrix.scale(this.cam.scale, this.cam.scale)
  gl2d.matrix.translate((location.x-this.cam.x)*this.cam.scale, (location.y-this.cam.y)*this.cam.scale);
  gl2d.drawImage(assets.projectile, [0, 0, 4, 4], [0, 0, 4, 4], [255, 255, 255, 255]);
  gl2d.matrix.reset();
}
export function drawTank(location, mainRot, towerRot, color) {
  let gl2d = this.gl2d;
  let assets = this.assets;
  
  gl2d.matrix.reset();

  gl2d.matrix.translate(-12, -22);
  gl2d.matrix.rotate(mainRot);
  gl2d.matrix.scale(this.cam.scale, this.cam.scale)
  gl2d.matrix.translate((location.x-this.cam.x)*this.cam.scale, (location.y-this.cam.y)*this.cam.scale);
  gl2d.drawImage(assets.tank0, [0, 0, 24, 46], [0, 0, 24, 46], [255, 255, 255, 255]);
  gl2d.drawImage(assets.tank1, [0, 0, 24, 46], [0, 0, 24, 46], [255, 255, 255, 255]);
  gl2d.drawImage(assets.tank2, [0, 0, 24, 46], [0, 0, 24, 46], color);
  gl2d.matrix.reset();
}

export function drawTankTurret(location, angle, color) {
  let gl2d = this.gl2d;
  let assets = this.assets;
  
  gl2d.matrix.reset();

  gl2d.matrix.translate(-12, -22);
  gl2d.matrix.rotate(angle);
  gl2d.matrix.scale(this.cam.scale, this.cam.scale)
  gl2d.matrix.translate((location.x-this.cam.x)*this.cam.scale, (location.y-this.cam.y)*this.cam.scale);
  gl2d.drawImage(assets.tank3, [0, 0, 24, 45], [0, 0, 24, 45], color);
  gl2d.matrix.reset();

}

