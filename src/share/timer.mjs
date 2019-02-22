export default class Timer{
  constructor(func,interval){
    this.running = false;
    this.func = func;
    this.interval = interval;
    this.count = 0;
    this.lastDate = 0;
    this.stats = {
      resets:0,
      deficit:0,
      ticks:0
    }
  }
}
Timer.prototype.timer = function(){
  this.count += Date.now() - this.lastDate;
  this.lastDate = Date.now();
  let i = 0;
  while (this.count >= this.interval && i<5){
    this.stats.ticks++;
    this.count -= this.interval;
    this.func();
    i++;
  }
  
  if (this.count >= this.interval*100){
    this.stats.deficit += this.count;
    this.count = 0;
    this.stats.resets++;
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