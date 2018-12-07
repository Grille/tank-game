class LocalServer{
  constructor(){
    this.localSocket;
    this.onmessage = (e)=>{console.log(e.data)};
  }
}

LocalServer.prototype.send = function(m){
  setTimeout(()=>{this.localSocket.onmessage({data:m})}, 4);
}
