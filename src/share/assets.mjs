export default class Assets{
  constructor(){
    this.enableGraphics = false;
    this.gl2d = null;
    this.loadFile = (path)=>{};
    this.vehicles = [];
    this.objects = [];
    this.projectiles = [];
    this.path = "";
  }
}

Assets.prototype.loadData = function(path){
  this.path = path;
  this.vehicles = JSON.parse(this.loadFile(path+"vehicles.jsonc"))
  this.objects = JSON.parse(this.loadFile(path+"objects.jsonc"))
  this.projectiles = JSON.parse(this.loadFile(path+"projectiles.jsonc"))
  for (let i = 0; i < this.objects.length; i++)
    this.initObject(this.objects[i]);
}
Assets.prototype.initObject = function(obj){
  if (this.enableGraphics){
    obj.graphic = this.gl2d.textureFromFile(this.path+obj.graphicPath+".png")
  }
}
