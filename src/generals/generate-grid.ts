import { SquareType, Square, GameGrid, Coord, Size2d } from './types';

// ----------------------------------------------------------------------------

function generateGrid(size: Size2d): GameGrid {
  const grid: any[][] = [];

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

// ----------------------------------------------------------------------------

function generateCell(grid: GameGrid, x: number, y: number): Square {
  const nearbyMountains: number = getNeightbors(grid, x, y)
    .filter(cell => cell && cell.type === SquareType.MOUNTAIN).length;

  const defaultProb = 0.1;
  const probMap = new Map<number, number>([
    [1, 0.35],
    [2, 0.35],
    [3, 0.05],
  ]);

  const mountainProb = probMap.get(nearbyMountains) || defaultProb;
  const isMountain = Math.random() < mountainProb;
  return {
    coord: { x, y },
    type: isMountain ? SquareType.MOUNTAIN : SquareType.BLANK,
  };
}

function getNeightbors(grid: GameGrid, x: number, y: number): Square[] {
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

// ----------------------------------------------------------------------------

function addPlayerGenerals(grid: GameGrid, numPlayers: number): Coord[] {
  const generals = [];

  const randCoord = (): Coord => ({
    x: Math.floor(Math.random() * grid[0].length),
    y: Math.floor(Math.random() * grid.length),
  });

  for (let i = 0; i < numPlayers; i++) {
    let coord = randCoord();
    while (grid[coord.y][coord.x].type !== SquareType.BLANK) {
      coord = randCoord();
    }

    grid[coord.y][coord.x].type = SquareType.GENERAL;
    generals.push(coord);
  }

  return generals;
}

// ----------------------------------------------------------------------------

export { generateGrid, addPlayerGenerals };
