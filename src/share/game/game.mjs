import extend from '../../extend.mjs'

import * as _gameCollision from './gameCollision.mjs';
import * as _gameLogic from './gameLogic.mjs';
import * as _gameSync from './gameSync.mjs';
import * as _gameUtils from './gameUtils.mjs';

import Timer from '../timer.mjs';

export default class Game{
  constructor(){
    this.isServer=false;
    this.server=null;
    this.map={
      ground:[],
      obj:[]
    };
    this.effects = [];
    this.players = [];
    this.vehicles = [];
    this.projectiles = [];
    this.timer=new Timer(()=>{this.gameLogic()},8);
  }
}

extend(Game, _gameCollision)
extend(Game, _gameLogic)
extend(Game, _gameSync)
extend(Game, _gameUtils)