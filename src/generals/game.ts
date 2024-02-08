
const SIZE = {
  width: 40,
  height: 40,
};

class Game {
  height: number;
  width: number;

  constructor() {
    this.height = SIZE.height;
    this.width = SIZE.width;
  }

}

enum CellType {
  MOUNTAIN,
  BLANK,
}

interface Cell {
  x: number;
  y: number;
  type: CellType;
}
type MaybeCell = Cell | null;

type CellGrid = MaybeCell[][];

function generateGrid(size: { width: number, height: number}) {
  const grid: CellGrid = [];
  for (let y = 0; y < size.height; y++) {
    grid.push([]);
    for (let x = 0; x < size.width; x++) {
      grid[y].push(null);
    }
  }

  for (let y = 0; y < size.height; y++) {
    for (let x = 0; x < size.width; x++) {
      grid[y][x] = generateCell(grid, x, y);
    }
  }
  return grid;
}

function generateCell(grid: CellGrid, x: number, y: number): Cell {
  const nearbyMountains: number = getNeightbors(grid, x, y)
    .filter(cell => cell && cell.type === CellType.MOUNTAIN).length;

  const defaultProb = 0.1;
  const probMap = new Map<number, number>([
    [1, 0.35],
    [2, 0.35],
    [3, 0.05],
  ]);

  const mountainProb = probMap.get(nearbyMountains) || defaultProb;
  const isMountain = Math.random() < mountainProb;
  return {
    x,
    y,
    type: isMountain ? CellType.MOUNTAIN : CellType.BLANK,
  };
}

function getNeightbors(grid: CellGrid, x: number, y: number): MaybeCell[] {
  const neighbors = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) {
        continue;
      }
      const cell = grid[y + dy] && grid[y + dy][x + dx];
      if (cell) {
        neighbors.push(cell);
      }
    }
  }
  return neighbors;
}

export { generateGrid, Game, type Cell, type CellGrid, CellType };
