import { Player } from './game';
import { isNeutralSquare } from './square';
import { SquareType, Square, GameGrid, Coord, Size2d, PlayerSquare } from './types';

// ----------------------------------------------------------------------------

function generateBlankGrid(size: Size2d): GameGrid {
  const grid: any[][] = [];
  for (let y = 0; y < size.height; y++) {
    grid.push([]);
    for (let x = 0; x < size.width; x++) {
      grid[y].push(createBlankCell({ x, y }));
    }
  }
  return grid;
}

function generateGridWithRandomMountains(size: Size2d): GameGrid {
  const grid = generateBlankGrid(size);

  for (let y = 0; y < size.height; y++) {
    for (let x = 0; x < size.width; x++) {
      grid[y][x] = mountainOrBlank(grid, x, y);
    }
  }
  return grid;
}

// ----------------------------------------------------------------------------

function createBlankCell(coord: Coord): Square {
  return { coord, type: SquareType.BLANK };
}

function createArmyCell(coord: Coord, playerId: number, units: number): PlayerSquare {
  return {
    coord,
    type: SquareType.ARMY,
    playerId,
    units,
  }
}

// TODO: Think about how to make this more configurable
function mountainOrBlank(grid: GameGrid, x: number, y: number): Square {
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

function addGenerals(grid: GameGrid, generals: Map<Player, Coord>): PlayerSquare[] {
  const playerSquares = [];
  for (let [player, coord] of generals) {
    const square = grid[coord.y][coord.x];
    const generalSquare = convertToGeneral(square, player);
    grid[coord.y][coord.x] = generalSquare;
    playerSquares.push(generalSquare);
  }
  return playerSquares;
}

function addRandomGenerals(grid: GameGrid, players: Player[]): PlayerSquare[] {
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
    units: 1,
  };
}

// ----------------------------------------------------------------------------

export {
  generateBlankGrid,
  generateGridWithRandomMountains,
  createBlankCell,
  createArmyCell,
  addGenerals,
  addRandomGenerals,
}
