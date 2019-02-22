
import { WebGL2DContext, Matrix } from '../lib/webgl2D.mjs'

export function setRenderTraget(canvas) {
  this.canvas = canvas;
  this.gl2d = new WebGL2DContext(canvas);
  this.gl2d.nullTexture = this.gl2d.textureFromPixelArray(new Uint8Array([255,255,255,100]),1,1)
}

export function updateCamera(location,factor){
  this.cam.x = this.cam.x*(1-factor)+(location.x-canvas.width/(2*this.cam.scale))*factor;
  this.cam.y = this.cam.y*(1-factor)+(location.y-canvas.height/(2*this.cam.scale))*factor;
}
export function render() {
  this.effectCount = 0;
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
      //this.cam.x += this.cam.vx;
      //this.cam.y += this.cam.vy;
      this.cam.x =this.cam.x*0.0 + (localVehicle.location.x-canvas.width/(2*this.cam.scale))*1;
      this.cam.y = this.cam.y*0.0 +(localVehicle.location.y-canvas.height/(2*this.cam.scale))*1;
    }
  }

  /*
  for (let i = 0; i < this.game.objects.length; i++) {
    let object = this.game.objects[i];
    if (object == null) continue;

    if (this.visible(object.location, 64)) {
      gl2d.matrix.reset();

      this.translate({x:object.location.x+5,y:object.location.y+5}, [-32, -32], object.angle)
      gl2d.drawImage(this.assets.tree, [0, 0, 64, 64], [0, 0, 64, 64], [0, 0, 0, 255]);
      
     gl2d.matrix.reset();
    }
  }
  */
  for (let i = 0; i < this.game.effects.length; i++) {
    let effect = this.game.effects[i];
    if (effect == null || effect.typ != 1) continue;
    this.drawEffect(effect)
  }
  for (let i = 0; i < this.game.vehicles.length; i++) {
    let vehicle = this.game.vehicles[i];
    if (vehicle == null) continue;
    let color = [vehicle.color.r, vehicle.color.g, vehicle.color.b, 255];
    if (vehicle.owner == null || vehicle.owner.connected === false) color[3]=128;
    this.drawTank(vehicle.location, vehicle.angle, vehicle.gunAngle, color);
  }
  for (let i = 0; i < this.game.vehicles.length; i++) {
    let vehicle = this.game.vehicles[i];
    if (vehicle == null) continue;
    let color = [vehicle.color.r, vehicle.color.g, vehicle.color.b, 255]; 
    if (vehicle.owner == null || vehicle.owner.connected === false) color[3]=128;
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
  for (let i = 0; i < this.game.objects.length; i++) {
    let object = this.game.objects[i];
    if (object == null) continue;

    if (this.visible(object.location, 64)) {
      gl2d.matrix.reset();

      gl2d.matrix.reset();
      this.translate(object.location, [-32, -32], object.angle)
      gl2d.drawImage(this.game.assets.objects[object.typ].graphic, [0, 0, 64, 64], [0, 0, 64, 64], [255, 255, 255, 255]);
      gl2d.matrix.reset();
      
     gl2d.matrix.reset();
    }
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
  //console.log(this.stats.renderTime);
  let _this = this;
  setTimeout(() => { _this.render() }, 10);
}

export function drawGround() {
  let gl2d = this.gl2d;

  gl2d.matrix.scale(this.cam.scale, this.cam.scale)
  let size = 64;
  let offsetX = this.cam.x % size - size, offsetY = this.cam.y % size - size;
  for (let ix = -2; ix < (this.canvas.width / size) / this.cam.scale + 1; ix++)
    for (let iy = -2; iy < (this.canvas.height / size) / this.cam.scale + 1; iy++)
      gl2d.drawImage(this.assets.ground, [0, 0, 64, 64], [ix * size - offsetX, iy * size - offsetY, size, size], [255, 255, 255, 255]);
  gl2d.matrix.reset();
}

export function drawEffect(effect) {
  if (this.effectCount > 10000 || !this.visible(location,8)) return;
  this.effectCount++;
  let gl2d = this.gl2d;
  let assets = this.assets;

  gl2d.matrix.reset();

  let progress = (((Date.now() - effect.birth) / effect.livetime));

  switch (effect.typ) {
    case 0: {
      this.translate(effect.location, [-8, -8], Math.random() * 360, progress * effect.size + 1)
      gl2d.drawImage(assets.fire, [0, 0, 16, 16], [0, 0, 16, 16], [255, 255, 255, (1 - progress) * 255]);
    }break;
    case 1: {
      this.translate(effect.location, [-8, -8], 0, progress * effect.size + 1)
      gl2d.drawImage(assets.dust, [0, 0, 16, 16], [0, 0, 16, 16], [255, 255, 255, (1 - progress) * 40]);
    }break;
  }
  gl2d.matrix.reset();
}
export function drawProjectile(location, velocity) {
  if (!this.visible(location,2))return;
  let gl2d = this.gl2d;
  let assets = this.assets;

  gl2d.matrix.reset();

  this.translate(location, [-2, -2])
  gl2d.drawImage(assets.projectile, [0, 0, 4, 4], [0, 0, 4, 4], [255, 255, 255, 255]);
  gl2d.matrix.reset();
}
export function drawTank(location, angle, towerRot, color) {
  if (!this.visible(location,30))return;
  let gl2d = this.gl2d;
  let assets = this.assets;

  gl2d.matrix.reset();

  this.translate(location, [-12, -22], angle)
  gl2d.drawImage(assets.tank0, [0, 0, 24, 46], [0, 0, 24, 46], [255, 255, 255, color[3]]);
  gl2d.drawImage(assets.tank1, [0, 0, 24, 46], [0, 0, 24, 46], [255, 255, 255, color[3]]);
  gl2d.drawImage(assets.tank2, [0, 0, 24, 46], [0, 0, 24, 46], color);
  gl2d.matrix.reset();
}

export function drawTankTurret(location, angle, color) {
  let gl2d = this.gl2d;
  let assets = this.assets;

  gl2d.matrix.reset();

  this.translate(location, [-12, -22], angle)
  gl2d.drawImage(assets.tank3, [0, 0, 24, 45], [0, 0, 24, 45], color);
  gl2d.matrix.reset();

}

export function translate(location, translate, angle, scale) {
  if (translate == null) translate = [0, 0];
  if (angle == null) angle = 0;
  if (scale == null) scale = 1;

  let gl2d = this.gl2d;

  gl2d.matrix.reset();

  gl2d.matrix.translate(translate[0], translate[1]);
  gl2d.matrix.rotate(angle);
  gl2d.matrix.scale(this.cam.scale * scale, this.cam.scale * scale)
  gl2d.matrix.translate((location.x - this.cam.x) * this.cam.scale, (location.y - this.cam.y) * this.cam.scale);
}
export function visible(location, bounding) {
  if (
    ((location.x - this.cam.x + bounding) * this.cam.scale < 0) ||
    ((location.y - this.cam.y + bounding) * this.cam.scale < 0) ||
    ((location.x - this.cam.x - bounding) * this.cam.scale > this.canvas.width) ||
    ((location.y - this.cam.y - bounding) * this.cam.scale > this.canvas.height)
  ) return false;
  return true;
}

