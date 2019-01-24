import ByteBuffer from '../share/byteBuffer.mjs';

export function printToChat(text) {
  html_chat.innerText += "\n" + text;
}
export function initChat() {
  html_chatInput.onchange = (e) => {
    if (this.socket.readyState && html_chatInput.value != "") {
      let buffer = new ByteBuffer()
      buffer.writeUint8(1);
      buffer.writeString(html_chatInput.value)
      this.socket.send(buffer.getBuffer());
      html_chatInput.value = "";
    }
  }
}