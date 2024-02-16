import { Player } from './game';
import { isNeutralSquare } from './square';
import { SquareType, Square, GameGrid, Coord, Size2d, PlayerSquare } from './types';

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
    // type: isMountain ? SquareType.MOUNTAIN : SquareType.BLANK,
    type: SquareType.BLANK,
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

function addPlayerGenerals(grid: GameGrid, players: Player[]): PlayerSquare[] {
  const s1 = grid[4][4];
  const s2 = grid[4][6];
  const g1 = convertToGeneral(s1, players[0]);
  const g2 = convertToGeneral(s2, players[1]);
  grid[s1.coord.y][s1.coord.x] = g1;
  grid[s2.coord.y][s2.coord.x] = g2;
  return [g1, g2];

  const generals = [];

  const randCoord = (): Coord => ({
    x: Math.floor(Math.random() * grid[0].length),
    y: Math.floor(Math.random() * grid.length),
  });

  for (let player of players) {
    let coord = randCoord();
    while (grid[coord.y][coord.x].type !== SquareType.BLANK) {
      coord = randCoord();
    }

    const square = grid[coord.y][coord.x];
    const generalSquare = convertToGeneral(square, player);
    grid[coord.y][coord.x] = generalSquare;
    generals.push(generalSquare);
  }

  return generals;
}

function convertToGeneral(square: Square, player: Player): PlayerSquare {
  if (!isNeutralSquare(square)) {
    throw new Error('Cannot convert non-neutral square to general');
  }
  return {
    ...square,
    type: SquareType.GENERAL,
    playerId: player.id,
    // units: 1,
    units: 20,
  };
}

// ----------------------------------------------------------------------------

export { generateGrid, addPlayerGenerals };
