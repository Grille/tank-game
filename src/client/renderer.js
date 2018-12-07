
let posX=200,posY=200;
let rot =0;
Client.prototype.render = function(){
  let gl2d = this.gl2d;

/*

  gl2d.startScene();

  gl2d.matrix.scale(1, 1)
  let offsetX = cam.x % 64 - 64, offsetY = cam.y % 64 - 64;
  for (let ix = 0; ix < canvas.width / 64 + 1; ix++)
    for (let iy = 0; iy < canvas.height / 64 + 1; iy++)
      gl2d.drawImage(assets.ground, [0, 0, 64, 64], [ix * 64 + offsetX, iy * 64 + offsetY, 64, 64], [255, 255, 255, 255]);

  gl2d.matrix.reset();

  let color = [97,115,81,255]
  this.drawTank(posX, posY, 45, rot,color)
  this.drawTank(posX+60, posY+20, 45, rot,color)

  this.drawTank(300, 300, 230, 156,color)

  rot += 0.5;
  posX += 0.1;
  posY -= 0.1;

  gl2d.endScene();
  gl2d.renderScene();

  setTimeout(this.render, 8);
}

Client.prototype.drawTank = function(posX, posY, mainRot, towerRot, color) {
  let gl2d = this.gl2d;

  gl2d.matrix.reset();

  gl2d.matrix.translate(-12, -22);
  gl2d.matrix.rotate(mainRot);
  gl2d.matrix.translate(posX,posY+2);
  gl2d.matrix.scale(2,2)
  gl2d.drawImage(assets.tank0,[0,0,24,45],[0,0,24,45],[0,0,0,100]);
  gl2d.drawImage(assets.tank1,[0,0,24,45],[0,0,24,45],[0,0,0,100]);
  gl2d.drawImage(assets.tank2,[0,0,24,45],[0,0,24,45],[0,0,0,100]);
  gl2d.matrix.reset();
  gl2d.matrix.translate(-12,-22);
  gl2d.matrix.rotate(towerRot);
  gl2d.matrix.translate(posX,posY+4);
  gl2d.matrix.scale(2,2)
  gl2d.drawImage(assets.tank3,[0,0,24,45],[0,0,24,45],[0,0,0,100]);
  gl2d.matrix.reset();

  gl2d.matrix.translate(-12,-22);
  gl2d.matrix.rotate(mainRot);
  gl2d.matrix.translate(posX,posY);
  gl2d.matrix.scale(2,2)
  gl2d.drawImage(assets.tank0,[0,0,24,45],[0,0,24,45],[255,255,255,255]);
  gl2d.drawImage(assets.tank1,[0,0,24,45],[0,0,24,45],[255,255,255,255]);
  gl2d.drawImage(assets.tank2,[0,0,24,45],[0,0,24,45],color);
  gl2d.matrix.reset();
  gl2d.matrix.translate(-12,-22);
  gl2d.matrix.rotate(towerRot);
  gl2d.matrix.translate(posX,posY);
  gl2d.matrix.scale(2,2)
  gl2d.drawImage(assets.tank3,[0,0,24,45],[0,0,24,45],color);
  gl2d.matrix.reset();
  */
}
