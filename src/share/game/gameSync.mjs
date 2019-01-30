import ByteBuffer from '../../lib/byteBuffer.mjs'

export function syncData(messageID,object){
  if (object==null)return;
  if (!this.isServer)return;
  let data = new ByteBuffer();
  data.writeUint8(messageID)

  switch (messageID) {
    case 10:
      data.writeUint8(object.id)
      data.writeString(object.name)
      data.writeUint8(object.color.r)
      data.writeUint8(object.color.g)
      data.writeUint8(object.color.b)
      data.writeUint8(object.team)
      data.writeUint8(object.vehicle == null ? 0 : object.vehicle.id+1)
      break;
    case 11:
      data.writeUint8(object.id)
      data.writeUint8(object.team)
      data.writeUint8(object.vehicle.id)
      break;
    case 15:
      data.writeUint8(object.id)
      data.writeFloat32(object.location.x)
      data.writeFloat32(object.location.y)

      data.writeFloat32(object.velocity.x)
      data.writeFloat32(object.velocity.y)

      data.writeFloat32(object.angle)
      data.writeFloat32(object.speed)
      break;
  }

  this.server.sendData(data);
}