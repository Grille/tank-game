import ByteBuffer from '../lib/byteBuffer.mjs';

import Vehicle from '../share/vehicle.mjs';
import Player from '../share/player.mjs';

export function addEventsControls() {
  let onkey = (e, set) => {
    let send = false;
    if (e.keyCode == 38 && this.eventMap.key.up != set) {
      this.eventMap.key.up = set; send = true;
    }
    if (e.keyCode == 40 && this.eventMap.key.down != set) {
      this.eventMap.key.down = set; send = true;
    }
    if (e.keyCode == 37 && this.eventMap.key.left != set) {
      this.eventMap.key.left = set; send = true;
    }
    if (e.keyCode == 39 && this.eventMap.key.right != set) {
      this.eventMap.key.right = set; send = true;
    }
    if (this.socket.readyState==1 && send) this.sendKeyControls();
  }
  let onmouse = (e) => {
    let send = false,set = 0;

    let posX = e.clientX - this.canvas.width / 2, posY = e.clientY - this.canvas.height / 2;
    let angle = (Math.atan2(posY, posX) * (180 / Math.PI));

    if (angle < 90)angle+=90
    else angle-=270;
    if (angle < 0)angle+=360

    if (this.eventMap.mouse.angle != angle) {
      this.eventMap.mouse.angle = angle; send = true;
    }

    set = (e.buttons & 1) == 1
    if (this.eventMap.mouse.leftdown != set) {
      this.eventMap.mouse.leftdown = set; send = true;
    }
    set = (e.buttons & 2) == 2
    if (this.eventMap.mouse.rightdown != set) {
      this.eventMap.mouse.rightdown = set; send = true;
    }
    //if (angle > 270)angle+=90
    //else angle-=90
    //if (send)

    /*
    let send = false;

    if (e.keyCode == 40 && this.eventMap.key.down != set) {
      this.eventMap.key.down = set; send = true;
    }
    if (e.keyCode == 37 && this.eventMap.key.left != set) {
      this.eventMap.key.left = set; send = true;
    }
    if (e.keyCode == 39 && this.eventMap.key.right != set) {
      this.eventMap.key.right = set; send = true;
    }
    */
    if (this.socket.readyState==1 && send) {
      this.sendMouseControls();
    }
    
  }
  window.onkeydown = (e) => { onkey(e, 1) }
  window.onkeyup = (e) => { onkey(e, 0) }

  canvas.onmousemove = (e) => { this.mouseEvent = e; }
  canvas.onmousedown = (e) => { this.mouseEvent = e; onmouse(e) }
  canvas.onmouseup = (e) => { this.mouseEvent = e; onmouse(e) }
  window.setInterval(()=>{ onmouse(this.mouseEvent) }, 100);
}

export function addEvents() {
  /*
  let _this = this;
  window.addEventListener("keydown",(e)=>{
    console.log(e.keyCode);
    _this.keyDown[e.keyCode] = true;
  });
  window.addEventListener("keyup",(e)=>{
    _this.keyDown[e.keyCode] = false;
  });
  */
}
