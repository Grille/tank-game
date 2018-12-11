class Socket{
  constructor(localServer){
    this.localServer = localServer;
    this.localServer.localSocket = this;
    this.onmessage = (e)=>{console.log(e.data)}
  }
}

Socket.prototype.send = function(m){
  setTimeout(()=>{this.localServer.onmessage({data:m})}, 4);
}
