import ByteBuffer from '../lib/byteBuffer.mjs';

export function printToChat(text) {
  html_chat.innerText += "\n" + text;
}
export function initChat() {
  html_chatInput.onkeyup = (e) => {
    if (this.socket.readyState==1 && html_chatInput.value != "" && e.keyCode == 13) {
      let buffer = new ByteBuffer()
      buffer.writeUint8(2);
      buffer.writeString(html_chatInput.value)
      this.socket.send(buffer.getBuffer());
      html_chatInput.value = "";
    }
  }
}
