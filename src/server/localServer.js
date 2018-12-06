class LocalServer{
  constructor(){
    this.localSocket;
    this.onmessage = ()=>{};
  }
}

LocalServer.prototype.send = function(str){
  localSocket.onmessage({data:str});
}
