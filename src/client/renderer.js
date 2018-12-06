function renderTimer(){
  render();
  setTimeout(renderTimer, 16);
}

function render(){
  gl2d.startScene();
  gl2d.matrix.reset();

  let offsetX = cam.x%64-64,offsetY
  for (let ix = 0;ix<canvas.width/64+1;ix++)
  gl2d.drawImage(ground,[0,0,64,64],[ix*64+ offsetX,cam.y,64,64],[255,255,255,255]);
  gl2d.endScene();
  gl2d.renderScene();
  cam.x++;
}
