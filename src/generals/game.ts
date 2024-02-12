
import { Coord, Movement, SquareType } from './types';
import { Board } from './board';

class Game {
  players: Player[];
  board: Board;

  private playersById: Map<number, Player>;

  constructor(players: Player[], board: Board) {
    this.players = players;
    this.playersById = new Map(players.map(p => [p.id, p]));

    this.board = board;
  }

  getPlayer(id: number): Player {
    const player = this.playersById.get(id);
    if (!player) {
      throw new Error(`Player with id ${id} not found`);
    }
    return player;
  }

  canMove(source: Coord, direction: Movement): boolean {
    const destCoord = applyDirection(source, direction);
    if (!this.board.isCoordValid(destCoord)) {
      return false;
    }
    const dest = this.board.getSquare(destCoord);
    return dest.type !== SquareType.MOUNTAIN;
  }
}

function applyDirection(coord: Coord, direction: Movement): Coord {
  switch (direction) {
    case Movement.UP:
      return { x: coord.x, y: coord.y - 1 };
    case Movement.DOWN:
      return { x: coord.x, y: coord.y + 1 };
    case Movement.LEFT:
      return { x: coord.x - 1, y: coord.y };
    case Movement.RIGHT:
      return { x: coord.x + 1, y: coord.y };
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
