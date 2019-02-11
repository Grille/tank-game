import ByteBuffer from '../../lib/byteBuffer.mjs'

import Player from '../player.mjs'
import Vehicle from '../vehicle.mjs'
import Entity from '../entity.mjs';

import {TYP,MESSAGE} from '../enum.mjs'

const READ = 1, WRITE = 0;

function read(typ, data, ref, $) {
  switch (typ) {
    case TYP.Uint8: ref[$] = data.readUint8(); break;
    case TYP.Int32: ref[$] = data.readInt32(); break;
    case TYP.Float32: ref[$] = data.readFloat32(); break;
    case TYP.String: ref[$] = data.readString(); break;
  }
}
function write(typ, data, ref, $) {
  switch (typ) {
    case TYP.Uint8: data.writeUint8(ref[$]); break;
    case TYP.Int32: data.writeInt32(ref[$]); break;
    case TYP.Float32: data.writeFloat32(ref[$]); break;
    case TYP.String: data.writeString(ref[$]); break;
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
    case MESSAGE.Player:
      func(TYP.String, data, object, 'name')
      func(TYP.Uint8, data, object.color, 'r');
      func(TYP.Uint8, data, object.color, 'g');
      func(TYP.Uint8, data, object.color, 'b');
      this.assembler(mode, MESSAGE.PlayerSelect, data, object);
      this.assembler(mode, MESSAGE.PlayerCKey, data, object);
      this.assembler(mode, MESSAGE.PlayerCMouse, data, object);
      break;
    case MESSAGE.PlayerSelect:
      func(TYP.Uint8, data, object, 'team');
      if (mode) object.vehicle = this.readID(data, this.vehicles);
      else data.writeUint8(object.vehicle == null ? 0 : object.vehicle.id + 1)
      break;
    case MESSAGE.PlayerCKey:
      func(TYP.Uint8, data, object.eventMap.key, 'up');
      func(TYP.Uint8, data, object.eventMap.key, 'down');
      func(TYP.Uint8, data, object.eventMap.key, 'left');
      func(TYP.Uint8, data, object.eventMap.key, 'right');
      break;
    case MESSAGE.PlayerCMouse:
      func(TYP.Float32, data, object.eventMap.mouse, 'angle');
      func(TYP.Uint8, data, object.eventMap.mouse, 'leftdown');
      func(TYP.Uint8, data, object.eventMap.mouse, 'rightdown');
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
    case MESSAGE.PlayerDelete: break;
    case MESSAGE.Vehicle:
      func(TYP.Float32, data, object.location, 'x');
      func(TYP.Float32, data, object.location, 'y');
      func(TYP.Float32, data, object.velocity, 'x');
      func(TYP.Float32, data, object.velocity, 'y');
      func(TYP.Float32, data, object, 'angle');
      func(TYP.Float32, data, object, 'gunAngle');
      func(TYP.Uint8, data, object.color, 'r');
      func(TYP.Uint8, data, object.color, 'g');
      func(TYP.Uint8, data, object.color, 'b');
      break;
    case MESSAGE.Projectile:
      func(TYP.Float32, data, object.location, 'x');
      func(TYP.Float32, data, object.location, 'y');
      func(TYP.Float32, data, object.velocity, 'x');
      func(TYP.Float32, data, object.velocity, 'y');
      break;
    case MESSAGE.Object:
      func(TYP.Uint8, data, object, 'typ');
      func(TYP.Float32, data, object.location, 'x');
      func(TYP.Float32, data, object.location, 'y');
      func(TYP.Float32, data, object, 'angle');
      break;
    case MESSAGE.ProjectileDelete: break;
  }
}
export function encodeObject(id, data, object) {
  data.writeUint16(object.id)
  this.assembler(WRITE, id, data, object);
}
export function encodeList(id, data) {
  switch (id) {
    case MESSAGE.All:
      this.encodeList(MESSAGE.AllVehicles, data);
      this.encodeList(MESSAGE.AllPlayers, data);
      this.encodeList(MESSAGE.AllProjectiles, data);
      this.encodeList(MESSAGE.AllObjects, data);
      break;
    case MESSAGE.AllPlayers:
      let pCount = 0;
      for (let i = 0; i < this.players.length; i++)
        if (this.players[i] != null) pCount += 1;
      data.writeUint16(pCount);
      for (let i = 0; i < this.players.length; i++)
        if (this.players[i] != null)
          this.encodeObject(MESSAGE.Player, data, this.players[i])
      break;
    case MESSAGE.AllVehicles:
      let vCount = 0;
      for (let i = 0; i < this.vehicles.length; i++)
        if (this.vehicles[i] != null) vCount += 1;
      data.writeUint16(vCount);
      for (let i = 0; i < this.vehicles.length; i++)
        if (this.vehicles[i] != null) {
          this.encodeObject(MESSAGE.Vehicle, data, this.vehicles[i])
        }
      break;
    case MESSAGE.AllProjectiles:
      let projCount = 0;
      for (let i = 0; i < this.projectiles.length; i++)
        if (this.projectiles[i] != null) projCount += 1;
      data.writeUint16(projCount);
      for (let i = 0; i < this.projectiles.length; i++)
        if (this.projectiles[i] != null) {
          this.encodeObject(MESSAGE.Projectile, data, this.projectiles[i])
        }
      break;
    case MESSAGE.AllObjects:
      let objCount = 0;
      for (let i = 0; i < this.objects.length; i++)
        if (this.objects[i] != null) objCount += 1;
      data.writeUint16(objCount);
      for (let i = 0; i < this.objects.length; i++)
        if (this.objects[i] != null) {
          this.encodeObject(MESSAGE.Object, data, this.objects[i])
        }
      break;
    default: console.error("invalid package id: " + id); break;
  }
}
export function decode(id, data) {
  switch (id) {
    case 10: case 11: case 12: case 13: case 14:
      let playerId = data.readUint16();
      if (this.players[playerId] == null) this.players[playerId] = new Player();
      this.assembler(READ, id, data, this.players[playerId]);
      break;
    case 20: case 21: case 22: case 23: case 24:
      let vehicleId = data.readUint16();
      if (this.vehicles[vehicleId] == null) this.vehicles[vehicleId] = new Vehicle();
      this.assembler(READ, id, data, this.vehicles[vehicleId]);
      break;
    case 30:
      let ProjectileId = data.readUint16();
      if (this.projectiles[ProjectileId] == null) this.projectiles[ProjectileId] = new Entity();
      this.assembler(READ, id, data, this.projectiles[ProjectileId]);
      break;
    case 31: {
      let ProjectileId = data.readUint16();
      this.projectiles[ProjectileId] = null
    } break;
    case MESSAGE.Object:
      let ObjectId = data.readUint16();
      if (this.objects[ObjectId] == null) this.objects[ObjectId] = new Entity();
      this.assembler(READ, id, data, this.objects[ObjectId]);
      break;
    case MESSAGE.Effect: {
      let typ = data.readUint8();
      let location = {x:data.readFloat32(),y:data.readFloat32()}
      let velocity = {x:data.readFloat32(),y:data.readFloat32()}
      let livetime = data.readInt32();
      let size = data.readFloat32();
      this.spawnEffect(typ,location,velocity,livetime,size);
    } break;
    case MESSAGE.All:
      this.decode(MESSAGE.AllVehicles,data);
      this.decode(MESSAGE.AllPlayers,data);
      this.decode(MESSAGE.AllProjectiles,data);
      this.decode(MESSAGE.AllObjects,data);
      break;
    case MESSAGE.AllPlayers:
      let pCount = data.readUint16();
      for (let i = 0; i < pCount; i++)
        this.decode(MESSAGE.Player, data);
      break;
    case MESSAGE.AllVehicles:
      let vCount = data.readUint16();
      for (let i = 0; i < vCount; i++)
        this.decode(MESSAGE.Vehicle, data);
      break;
    case MESSAGE.AllProjectiles:
      let projCount = data.readUint16();
      for (let i = 0; i < projCount; i++)
        this.decode(MESSAGE.Projectile, data);
      break;
      case MESSAGE.AllObjects:
      let objCount = data.readUint16();
      for (let i = 0; i < objCount; i++)
        this.decode(MESSAGE.Object, data);
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
export function syncEffect(object) {
  let data = new ByteBuffer();
  data.writeUint8(32)
  data.writeUint8(object.typ)
  data.writeFloat32(object.location.x);
  data.writeFloat32(object.location.y);
  data.writeFloat32(object.velocity.x);
  data.writeFloat32(object.velocity.y);
  data.writeInt32(object.livetime);
  data.writeFloat32(object.size);
  this.server.sendData(data);
}

export function syncTimer() {
  if (this.isServer) {
    this.syncList(MESSAGE.AllVehicles);
    let _this = this;
    setTimeout(() => { _this.syncTimer() }, 250);
  }
}