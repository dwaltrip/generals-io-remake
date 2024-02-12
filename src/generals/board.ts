import { GameGrid, Coord, Size2d, Square, Movement, SquareType } from '@/generals/types';

import { Player } from '@/generals/game';
import { generateGrid, addPlayerGenerals } from '@/generals/generate-grid';

class Board {
  grid: GameGrid;
  players: Player[];

  constructor(grid: GameGrid, players: Player[]) {
    this.grid = grid;
    this.players = players;
    validateGrid(grid)
    addPlayerGenerals(this.grid, this.players.length);
  }

  static build(size: Size2d, players: Player[]) {
    const grid = generateGrid(size);
    return new Board(grid, players);
  }

  get width() {
    return this.grid[0].length;
  }

  get height() {
    return this.grid.length;
  }

  canMove(source: Coord, direction: Movement): boolean {
    const destCoord = applyDirection(source, direction);
    if (!this.isCoordValid(destCoord)) {
      return false;
    }
    const dest = this.getSquare(destCoord);
    return dest.type !== SquareType.MOUNTAIN;
  }

  getSquare(coord: Coord): Square {
    if (!this.isCoordValid(coord)) {
      throw new Error('Coord is not valid');
    }
    const { x, y } = coord;
    return this.grid[y][x];
  }

  isCoordValid(coord: Coord): boolean {
    const { x, y } = coord;
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
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

export { Board };
