import { ActionType, performAction } from './actions';
import { Board } from './board';
import { GameConfigData, GameConfig } from './game-config';

// TODO: rename to Engine or something like that?
class Game {
  players: Player[];
  board: Board;
  config: GameConfig;
  // ticksPerTurn: number;

  private tickCounter: number = 0;
  private playersById: Map<number, Player>;
  private onTickCallbacks: ((tick: number) => void)[] = [];

  constructor(players: Player[], board: Board, config: GameConfig | GameConfigData) {
    this.players = players;
    this.playersById = new Map(players.map(p => [p.id, p]));
    this.board = board;
    this.config  = config instanceof GameConfig ? config : GameConfig.fromData(config);
  }

  getPlayer(id: number): Player {
    const player = this.playersById.get(id);
    if (!player) {
      throw new Error(`Player with id ${id} not found`);
    }
    return player;
  }

  forEachSquareForPlayer(player: Player, callback: (square: any) => void) {
    for (let square of this.board.iterPlayerSquares(player)) {
      callback(square);
    }
  }

  get generals() {
    return this.board.generals;
  }

  get ticksPerTurn() {
    return this.config.TICKS_PER_TURN;
  }

  get turn() {
    return Math.floor(this.tickCounter / this.ticksPerTurn);
  }

  get isTurnTick() {
    return (this.tickCounter % this.ticksPerTurn) === 0;
  }

  get isTroopRecruitmentTick() {
    return (
      this.turn > 0 &&
      this.isTurnTick &&
      (this.turn % this.config.TROOP_RECRUITMENT_TURN_INTERVAL) === 0
    );
  }

  tick() {
    this.tickCounter++;

    if (this.isTurnTick) {
      performAction(this, ActionType.GENERAL_PRODUCTION);
    }

    if (this.isTroopRecruitmentTick) {
      performAction(this, ActionType.TROOP_RECRUITMENT);
    }

    this.onTickCallbacks.forEach(cb => cb(this.tickCounter));
  }

  onTick(callback: (tick: number) => void) {
    this.onTickCallbacks.push(callback);
  }
}

enum PlayerColor {
  RED = 'RED',
  BLUE = 'BLUE',
  GREEN = 'GREEN',
  YELLOW = 'YELLOW',
  ORANGE = 'ORANGE',
  PURPLE = 'PURPLE',
  PINK = 'PINK',
  SILVER = 'SILVER',
}

const ColorMap = new Map([
  [PlayerColor.RED, '#e33030'],
  [PlayerColor.BLUE, '#308ee3'],
]);

class Player {
  id: number;
  username: string;
  color: PlayerColor;

  constructor(id: number, username: string, color: PlayerColor) {
    this.id = id;
    this.username = username;
    this.color = color;
  }
}

function getPlayerColorInHex(player: Player): string {
  return ColorMap.get(player.color) || '#ddd';
}

export { Game, Player, PlayerColor, getPlayerColorInHex };
