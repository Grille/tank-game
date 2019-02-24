import extend from '../../extend.mjs'

import * as _gameCollision from './gameCollision.mjs';
import * as _gameLogic from './gameLogic.mjs';
import * as _gameSync from './gameSync.mjs';
import * as _gameUtils from './gameUtils.mjs';

import Timer from '../timer.mjs';
import Assets from '../assets.mjs'

export default class Game{
  constructor(){
    this.isServer=false;
    this.server=null;
    this.resets=0;
    this.map={
      ground:[],
      obj:[]
    };
    this.stats = {
      simFrameTime:0,
      count:{
        objects:0,
        effects:0,
        players:0,
        vehicles:0,
        projectiles:0
      }
    }
    this.chunks = [];
    this.objects = [];
    this.effects = [];
    this.players = [];
    this.vehicles = [];
    this.projectiles = [];
    this.assets = new Assets();
    this.timer=new Timer(()=>{this.gameLogic()},10);
  }
}

extend(Game, _gameCollision)
extend(Game, _gameLogic)
extend(Game, _gameSync)
extend(Game, _gameUtils)