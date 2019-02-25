import readline from 'readline';
import { isNullOrUndefined } from 'util';
import { count } from '../share/game/gameLogic.mjs';

export function consoleInit(){
  readline.emitKeypressEvents(process.stdin);
  //process.stdin.setRawMode(true);
  process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
      process.exit();
    } else if (key.name === 'return'){
      this.parseCommand(this.consoleInput);
      this.consoleInput="";
      this.consoleUpdate();
    } else if (str!=undefined&&key.name!='enter'){
      this.consoleInput+=str;
      this.consoleUpdate();
    }
  });
}
export function parseCommand(command){
  let cmd = command.split(" ");
  switch (cmd[0]){
    case "restart":{
      this.startGame();
      console.log("restart()");
    }break;
    case "start":{
      this.game.timer.start();
      if (cmd[1] != null)
        this.port = Number.parseInt(cmd[1])
      this.start(this.port);
      console.log("start()");
    }break;
    case "clear":{
      console.log('\x1Bc');
    }break;
    case "eval":{
      if (cmd[1] != null) {
        try{
          let date = Date.now();
          eval(cmd[1]);
          console.log("executed "+(Date.now()-date)+"ms");
        }catch (e){
          console.log(e.message);
        }
      }
      else
      console.log("invalid argument");
    }break;
    case "show":{
      if (cmd[1] != null) {
        try{
          let date = Date.now();
          eval("console.log(this."+cmd[1]+")");
        }catch (e){
          console.log(e.message);
        }
      }
      else
      console.log("invalid argument");
    }break;
    case "chat":{
      if (cmd[1] != null)
        this.sendChatMessage(cmd[1]);
      else
        console.log("invalid argument");
    }break;
    case "count":{
      let list = this.game[cmd[1]]
      if (list != null) {
        let count = 0;
        for (let i = 0; i < list.length; i++)
          if (list[i] != null)
            count+=1;
        console.log(count);
      }
      else
      console.log("invalid argument");
    }break;
    case "list":{
      let list = this.game[cmd[1]]
      if (list != null) {
        console.log(cmd[1]+".length: " + list.length);
        for (let i = 0; i < list.length; i++)
          if (list[i] != null)
            console.log(" " + list[i].id + ") ");
      }
      else
      console.log("invalid argument");
    }break;
    case "stop":{
      this.game.timer.stop();
      this.stop();
      console.log("stop()");
    }break;
    default:{
      console.log("invalid command");
    }
  }
}
export function timeToString(ms){
  let sec = ms/1000;
  let
    h = (((sec/60)|0)/60)|0,
    m = (((sec/60)|0)%60)|0,
    s = (sec%60)|0
    return ''+(h<10?'0':'')+h+':'+(m<10?'0':'')+m+':'+(s<10?'0':'')+s
}
export function consoleLog(msg){
  this.logs[this.logs.length]={typ:0,msg:timeToString(Date.now()-this.startDate)+" : "+msg+'\n'};
  console.log(msg);
  //this.consoleUpdate();
}
export function consoleUpdate(){
  let output = "";
  
  //output+=;
  output+="< tank-game server >\n\n";

  this.game.count();
  output+="stats:\n";
  output+=" running since : "+timeToString(Date.now()-this.startDate)+'\n';
  output+=" SFT           : "+(this.game.stats.simFrameTime|0)+'ms\n';
  output+=" T.resets      : "+(this.game.timer.stats.resets|0)+'\n';
  output+=" T.deficit     : "+(this.game.timer.count|0)+'ms\n';
  output+=" T.ticks       : "+(this.game.timer.stats.ticks|0)+'\n';
  output+=" C.objects     : "+(this.game.stats.count.objects|0)+'\n';
  output+=" C.players     : "+(this.game.stats.count.players|0)+'\n';
  output+=" C.vehicles    : "+(this.game.stats.count.vehicles|0)+'\n';
  output+=" C.projectiles : "+(this.game.stats.count.projectiles|0)+'\n';
  output+="\n";
  
  //output+='\x1B[0;40H';
  output+="messages...\n";
  for (let i = 0;i<this.logs.length;i++){
    output+='\x1B['+(i+3)+';40H';
    output+=this.logs[i].msg;
  }
  
  //output+='\x1B['+(process.stdout.rows-2)+';0H------------------------------------------------------------------------------------------';
  //output+='\x1B['+process.stdout.rows+';0H------------------------------------------------------------------------------------------';
  //output+='\x1B['+(process.stdout.rows-1)+';0H'+this.consoleInput;
  //process.stdout.write(output);
}