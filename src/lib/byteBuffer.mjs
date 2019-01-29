export default class ByteBuffer {
  constructor(data) {
    this.index = 0;
    this.data = [];
    if (data != void 0)
      this.data = new Uint8Array(data);
  }
}
ByteBuffer.prototype.setBuffer = function (value) {
  this.data = new Uint8Array(value);
  this.index = 0;
}
ByteBuffer.prototype.getBuffer = function () {
  this.index = 0;
  return new Uint8Array(this.data);
}
ByteBuffer.prototype.writeUint8 = function (value) {
  this.data[this.index++] = value | 0
}
ByteBuffer.prototype.writeInt32 = function (value) {
  let bytes = new Array(3);
  let v = value;
  this.data[this.index + 3] = (v) & (255);
  this.data[this.index + 2] = (v = v >> 8) & (255);
  this.data[this.index + 1] = (v = v >> 8) & (255);
  this.data[this.index + 0] = (v = v >> 8) & (255);
  this.index += 4;
}
ByteBuffer.prototype.writeFloat32 = function (value) {
  let float = new Float32Array([value]);
  let bytes = new Uint8Array(float.buffer);
  this.data[this.index + 3] = bytes[3];
  this.data[this.index + 2] = bytes[2];
  this.data[this.index + 1] = bytes[1];
  this.data[this.index + 0] = bytes[0];
  this.index += 4;
}
ByteBuffer.prototype.writeString = function (value) {
  this.data[this.index++] = value.length
  for (let i = 0; i < value.length; i++) {
    this.data[this.index++] = value.charCodeAt(i);
  }
}

ByteBuffer.prototype.readUint8 = function () {
  return this.data[this.index++] | 0
}
ByteBuffer.prototype.readInt32 = function () {
  return (this.data[this.index++] << 24 | this.data[this.index++] << 16 | this.data[this.index++] << 8 | this.data[this.index++] << 0)
}
ByteBuffer.prototype.readFloat32 = function () {
  let float = new Float32Array(new Uint8Array([this.data[this.index++], this.data[this.index++], this.data[this.index++], this.data[this.index++]]).buffer)[0];
  return float;
}
ByteBuffer.prototype.readString = function () {
  let result = "";
  let length = this.data[this.index++]
  for (let i = 0; i < length; i++) {
    result += String.fromCharCode(this.data[this.index++])
  }
  return result;
}