class ByteBuffer{
    constructor(data){
        this.index = 0;
        this.data = [];
        if (data != void 0)
        this.data = data;
    }
}
ByteBuffer.prototype.setBuffer = function(value){
    this.data = value;
    this.index = 0;
}
ByteBuffer.prototype.getBuffer = function(){
    this.index = 0;
    return new Uint8Array(this.data);
}
ByteBuffer.prototype.writeUInt8 = function(value){
    this.data[this.index++] = value|0
}
ByteBuffer.prototype.writeInt32 = function(value){
    bytes=new Array(3);
    let v = value;
    this.data[this.index+3]=(v) & (255);
    this.data[this.index+2]=(v=v>>8) & (255);
    this.data[this.index+1]=(v=v>>8) & (255);
    this.data[this.index+0]=(v=v>>8) & (255);  
    this.index+=4;  
}
ByteBuffer.prototype.writeSingle = function(value){
    bytes=new Array(3);
    let v = value;
    this.data[this.index+3]=(v) & (255);
    this.data[this.index+2]=(v=v>>8) & (255);
    this.data[this.index+1]=(v=v>>8) & (255);
    this.data[this.index+0]=(v=v>>8) & (255);  
    this.index+=4;  
}
ByteBuffer.prototype.writeString = function(value){
    this.data[this.index++] = value.length
    for (let i = 0;i<value.length;i++){
        this.data[this.index++] = value.charCodeAt(i);
    }
}

ByteBuffer.prototype.readUInt8 = function(){
    return this.data[this.index++]|0
}
ByteBuffer.prototype.readInt32 = function(){
    return (this.data[this.index++]<<24 | this.data[this.index++]<<16 | this.data[this.index++]<<8 | this.data[this.index++]<<0)
}
ByteBuffer.prototype.readSingle = function(){
    return (this.data[this.index++]<<24 | this.data[this.index++]<<16 | this.data[this.index++]<<8 | this.data[this.index++]<<0)
}
ByteBuffer.prototype.readString = function(){
    let result = "";
    let length = this.data[this.index++] 
    for (let i = 0;i<length;i++){
        result += String.fromCharCode(this.data[this.index++])
    }
    return result;
}

/*
You can do it with typed arrays:

var buffer = new ArrayBuffer(4);
var floatView = new Float32Array(buffer);

floatView[0] = Math.PI
console.log(intView[0].toString(2)); //bits of the 32 bit float
Or another way:

var view = new DataView(new ArrayBuffer(4));
view.setFloat32(0, Math.PI);
console.log(view.getInt32(0).toString(2)); //bits of the 32 bit float
*/

//let module = {};
module.exports = ByteBuffer;