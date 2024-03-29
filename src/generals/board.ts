import { GameGrid, Coord, Size2d, Square, Movement, SquareType, PlayerSquare } from '@/generals/types';

import { Player } from '@/generals/game';
import { generateBlankGrid, addGenerals, addRandomGenerals } from '@/generals/generate-grid';
import { assert } from '@/utils/assert';
import { isPlayerSquare, isSquare } from './square';

class Board {
  grid: GameGrid;
  players: Player[];
  generals = new Map<Player, PlayerSquare>();

  constructor(grid: GameGrid, players: Player[]) {
    this.grid = grid;
    this.players = players;
    validateGrid(grid)
  }

  static buildBlank(size: Size2d, players: Player[]) {
    const grid = generateBlankGrid(size);
    return new Board(grid, players);
  }

  static buildWithGenerals(size: Size2d, players: Player[], generals: Map<Player, Coord>) {
    const grid = generateBlankGrid(size);
    const board = new Board(grid, players);
    board._setGenerals(players, addGenerals(grid, generals));
    return board;
  }

  static buildWithRandomGenerals(size: Size2d, players: Player[]) {
    const grid = generateBlankGrid(size);
    const board = new Board(grid, players);
    board._setGenerals(players, addRandomGenerals(grid, players));
    return board;
  }

  private _setGenerals(players: Player[], generals: PlayerSquare[]) {
    assert(players.length === generals.length, 'Number of players and generals must match');
    for (let i = 0; i < players.length; i++) {
      this.generals.set(players[i], generals[i]);
    }
  }

  get width() {
    return this.grid[0].length;
  }

  get height() {
    return this.grid.length;
  }

  *iterSquares(): IterableIterator<Square> {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        yield this.grid[y][x];
      }
    }
  }

  *iterPlayerSquares(player: Player): IterableIterator<PlayerSquare> {
    for (let square of this.iterSquares()) {
      if (isPlayerSquare(square) && square.playerId === player.id) {
        yield square;
      }
    }
  }

  allSquares(): Square[] {
    return Array.from(this.iterSquares());
  }

  allPlayerSquares(player: Player): PlayerSquare[] {
    return Array.from(this.iterPlayerSquares(player));
  }

  canMove(source: Coord, direction: Movement): boolean {
    const destCoord = applyDirection(source, direction);
    if (!this.isCoordValid(destCoord)) {
      return false;
    }
    const dest = this.getSquare(destCoord);
    // TODO: make this more robust. should be defined somewhere else
    if (dest.type === SquareType.MOUNTAIN) {
      return false;
    }
    return true;
  }

  getSquare(coord: Coord, movement?: Movement): Square {
    if (movement !== undefined) {
      coord = applyDirection(coord, movement);
    }
    assert(this.isCoordValid(coord), 'Coord is not valid');

    const { x, y } = coord;
    return this.grid[y][x];
  }

  isCoordValid(coord: Coord): boolean {
    const { x, y } = coord;
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  replaceSquare(coord: Coord, square: Square) {
    assert(this.isCoordValid(coord), 'Coord is not valid');
    const { x, y } = coord;
    this.grid[y][x] = square;
  }

  neighborsFor(val: Coord | Square): Square[] {
    const coord = isSquare(val) ? val.coord : val;
    const deltas = [
      [-1, 0],
      [0, -1],
      [1, 0],
      [0, 1],
    ];
    return deltas
      .map(([dx, dy]): Coord => ({ x: coord.x + dx, y: coord.y + dy }))
      .filter(neighbor => this.isCoordValid(neighbor))
      .map(neighbor => this.getSquare(neighbor));
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

function validateGrid(grid: GameGrid) {
  if (grid.length === 0) {
    throw new Error("Grid must have at least one row");
  }
  if (grid[0].length === 0) {
    throw new Error("Grid must have at least one column");
  }
  if (!grid.every(row => row.length === grid[0].length)) {
    throw new Error("All rows must have the same length");
  }
}

export { Board, applyDirection };
