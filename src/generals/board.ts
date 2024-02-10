import { GameGrid, Coord, Square } from "./types";

class Board {
  grid: GameGrid;

  constructor(grid: GameGrid) {
    validateGrid(grid)
    this.grid = grid;
  }

  get width() {
    return this.grid[0].length;
  }

  get height() {
    return this.grid.length;
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
