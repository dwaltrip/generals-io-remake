import { ActionType, performAction } from './actions';
import { Board } from './board';

// TODO: rename to Engine or something like that?
class Game {
  players: Player[];
  board: Board;
  ticksPerSecond: number;

  private tickCounter: number = 0;
  private playersById: Map<number, Player>;
  private onTickCallbacks: ((tick: number) => void)[] = [];

  constructor(players: Player[], board: Board, ticksPerSecond: number) {
    this.players = players;
    this.playersById = new Map(players.map(p => [p.id, p]));
    this.board = board;
    this.ticksPerSecond = ticksPerSecond
  }

  getPlayer(id: number): Player {
    const player = this.playersById.get(id);
    if (!player) {
      throw new Error(`Player with id ${id} not found`);
    }
    return player;
  }

  get turn() {
    return Math.floor(this.tickCounter / this.ticksPerSecond);
  }

  get isTurnTick() {
    return (this.tickCounter % this.ticksPerSecond) === 0;
  }

  tick() {
    this.tickCounter++;
    if (this.isTurnTick) {
      performAction(this, ActionType.GENERAL_PRODUCTION);
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

export { Game, Player, PlayerColor };
