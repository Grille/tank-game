
Client.prototype.logic = function(){
  console.log(this.socket);
  console.log("g");
  this.socket.send("2|"+this.keyDown[0]+'|'+this.keyDown[0]+'|'+this.keyDown[0]+'|'+this.keyDown[0]+'|'+this.keyDown[0]+'|')
  console.log("g");

  setTimeout(this.logic, 8);
}