export default class Timer{
  constructor(func,interval){
    this.running = false;
    this.func = func;
    this.interval = interval;
    this.count = 0;
    this.lastDate = 0;
  }
}
Timer.prototype.timer = function(){
  this.count += Date.now() - this.lastDate;
  this.lastDate = Date.now();
  let i = 0;
  while (this.count >= this.interval && i<4){
    this.count -= this.interval;
    this.func();
    i++;
  }
  while (this.count >= this.interval){
    this.count -= this.interval;
  }
  if (this.running)
    setTimeout(()=>{this.timer()}, 10);
}
Timer.prototype.start = function(){
  this.lastDate = Date.now();
  this.running = true;
  this.timer();
}
Timer.prototype.stop = function(){
  this.running = false;
}