class Server{
  constructor(){
    this.localSocket;
    this.onmessage = (e)=>{console.log(e.data)};
  }
}

Server.prototype.send = function(m){
  setTimeout(()=>{this.localSocket.onmessage({data:m})}, 4);
}
