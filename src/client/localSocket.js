class LocalSocket{
  constructor(localServer){
    this.localServer = localServer;
    this.localServer.localSocket = this;
    this.onmessage = (e)=>{}
  }
}

LocalSocket.prototype.send = function(m){
  this.localServer.onmessage({data:m});
}
