import extend from '../../extend.mjs'

import * as _gameLogic from './gameLogic.mjs';
import * as _gameSync from './gameSync.mjs';
import * as _gameUtils from './gameUtils.mjs';

export default class Game{
  constructor(){
    this.map;
    this.players = [];
    this.vehicles = [];
    this.effects = [];
    this.projectiles = [];
  }
}

extend(Game, _gameLogic)
extend(Game, _gameSync)
extend(Game, _gameUtils)