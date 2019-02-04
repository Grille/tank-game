import ByteBuffer from '../../lib/byteBuffer.mjs'

import Player from '../player.mjs'
import Vehicle from '../vehicle.mjs'

const typ = { Uint8: 0, Int32: 1, Float32: 2, String: 3, ID8: 4 };
const READ = 1, WRITE = 0;

function read(typ, data, ref, $) {
  switch (typ) {
    case 0: ref[$] = data.readUint8(); break;
    case 1: ref[$] = data.readInt32(); break;
    case 2: ref[$] = data.readFloat32(); break;
    case 3: ref[$] = data.readString(); break;
  }
}
function write(typ, data, ref, $) {
  switch (typ) {
    case 0: data.writeUint8(ref[$]); break;
    case 1: data.writeInt32(ref[$]); break;
    case 2: data.writeFloat32(ref[$]); break;
    case 3: data.writeString(ref[$]); break;
  }
}
export function readID(data, srcList, func) {
  let id = data.readUint8();
  let result = id > 0 ? srcList[id - 1] : null;
  if (id != 0 && result == null) console.error("ReferenceError serialized reference [" + id + "] is null");
  if (result != null && func != null) func(result);
  return result;
}

export function assembler(mode, id, data, object) {
  let func = mode ? read : write;
  switch (id) {
    case 10:
      func(typ.String, data, object, 'name')
      func(typ.Uint8, data, object.color, 'r');
      func(typ.Uint8, data, object.color, 'g');
      func(typ.Uint8, data, object.color, 'b');
      this.assembler(mode, 11, data, object);
      this.assembler(mode, 12, data, object);
      this.assembler(mode, 13, data, object);
      break;
    case 11:
      func(typ.Uint8, data, object, 'team');
      if (mode) object.vehicle = this.readID(data, this.vehicles);
      else data.writeUint8(object.vehicle == null ? 0 : object.vehicle.id + 1)
      break;
    case 12:
      func(typ.Uint8, data, object.eventMap.key, 'up');
      func(typ.Uint8, data, object.eventMap.key, 'down');
      func(typ.Uint8, data, object.eventMap.key, 'left');
      func(typ.Uint8, data, object.eventMap.key, 'right');
      break;
    case 13:
      func(typ.Float32, data, object.eventMap.mouse, 'angle');
      func(typ.Uint8, data, object.eventMap.mouse, 'leftdown');
      func(typ.Uint8, data, object.eventMap.mouse, 'rightdown');
      let mouse = object.eventMap.mouse;
      if (mouse.leftclick == 0 && mouse.leftdown == 1)
        mouse.leftclick = 1;
      if (mouse.leftclick == 2 && mouse.leftdown == 0)
        mouse.leftclick = 0;
      if (mouse.rightclick == 0 && mouse.rightdown == 1)
        mouse.rightclick = 1;
      if (mouse.rightclick == 2 && mouse.rightdown == 0)
        mouse.rightclick = 0;
      break;
    case 14: break;
    case 20:
      func(typ.Float32, data, object.location, 'x');
      func(typ.Float32, data, object.location, 'y');
      func(typ.Float32, data, object.velocity, 'x');
      func(typ.Float32, data, object.velocity, 'y');
      func(typ.Float32, data, object, 'angle');
      func(typ.Float32, data, object, 'gunAngle');
      func(typ.Uint8, data, object.color, 'r');
      func(typ.Uint8, data, object.color, 'g');
      func(typ.Uint8, data, object.color, 'b');
      break;
  }
}
export function encode(id) {
  let data = new ByteBuffer();
  data.writeUint8(id)
  switch (id) {
    case 10: case 11: case 12: case 13: case 14:
    case 20: case 21: case 22: case 23: case 24:
    default: console.error("invalid package id: " + id); break;
  }
}
export function encodeObject(id, data, object) {
  data.writeUint8(object.id)
  this.assembler(WRITE, id, data, object);
}
export function encodeList(id, data) {
  switch (id) {
    case 90:
      this.encodeList(92, data);
      this.encodeList(91, data);
      break;
    case 91:
      let pCount = 0;
      for (let i = 0; i < this.players.length; i++)
        if (this.players[i] != null) pCount += 1;
      data.writeUint8(pCount);
      for (let i = 0; i < this.players.length; i++)
        if (this.players[i] != null)
          this.encodeObject(10, data, this.players[i])
      break;
    case 92:
      let vCount = 0;
      for (let i = 0; i < this.vehicles.length; i++)
        if (this.vehicles[i] != null) vCount += 1;
      data.writeUint8(vCount);
      for (let i = 0; i < this.vehicles.length; i++)
        if (this.vehicles[i] != null) {
          this.encodeObject(20, data, this.vehicles[i])
        }
      break;
    default: console.error("invalid package id: " + id); break;
  }
}
export function decode(id, data) {
  switch (id) {
    case 10: case 11: case 12: case 13: case 14:
      let playerId = data.readUint8();
      if (this.players[playerId] == null) this.players[playerId] = new Player();
      this.assembler(READ, id, data, this.players[playerId]);
      break;
    case 20: case 21: case 22: case 23: case 24:
      let vehicleId = data.readUint8();
      if (this.vehicles[vehicleId] == null) this.vehicles[vehicleId] = new Vehicle();
      this.assembler(READ, id, data, this.vehicles[vehicleId]);
      break;
    case 90:
      this.decode(92,data);
      this.decode(91,data);
      break;
    case 91:
      //this.players = [];
      let pCount = data.readUint8();
      for (let i = 0; i < pCount; i++)
        this.decode(10, data);
      break;
    case 92:
      //this.vehicles = [];
      let vCount = data.readUint8();
      for (let i = 0; i < vCount; i++)
        this.decode(20, data);
      break;
    default: console.error("invalid package id: " + id); break;
  }
}

export function syncList(id) {
  let data = new ByteBuffer();
  data.writeUint8(id)
  this.encodeList(id, data);
  this.server.sendData(data);
}
export function syncObject(id, object) {
  let data = new ByteBuffer();
  data.writeUint8(id)
  this.encodeObject(id, data, object);
  this.server.sendData(data);
}