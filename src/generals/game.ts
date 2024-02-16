import { ActionType, performAction } from './actions';
import { Board } from './board';

const TROOP_RECRUITMENT_TURN_INTERVAL = 100;

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

  forEachSquareForPlayer(player: Player, callback: (square: any) => void) {
    for (let square of this.board.iterPlayerSquares(player)) {
      callback(square);
    }
  }

  get turn() {
    return Math.floor(this.tickCounter / this.ticksPerSecond);
  }

  get isTurnTick() {
    return (this.tickCounter % this.ticksPerSecond) === 0;
  }

  get isTroopRecruitmentTick() {
    return (
      this.turn > 0 &&
      this.isTurnTick &&
      (this.turn % TROOP_RECRUITMENT_TURN_INTERVAL) === 0
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
