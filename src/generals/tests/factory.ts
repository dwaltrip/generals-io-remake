import { rangeMap, repeat } from '@/utils/repeat';
import { assert } from '@/utils/assert';

import { PlayerSquare, Size2d } from '@/generals/types';
import { GameConfig, GameConfigData } from '@/generals/game-config';
import { Game, Player, PlayerColor } from '@/generals/game';
import { Board } from '@/generals/board';
import { createArmyCell } from '@/generals/generate-grid';
import { isBlankSquare } from '@/generals/square';

const DEFAULT_CONFIG = { TICKS_PER_TURN: 2, TROOP_RECRUITMENT_TURN_INTERVAL: 25 };

type PlayerGrid = (PlayerSquare | null)[][];

const doTicks = (game: Game, n: number) => repeat(n, () => game.tick());
const doTurns = (game: Game, n: number) => doTicks(game, n * game.config.TICKS_PER_TURN);

function makePlayerGenerator(): () => Player {
  let num = 0;
  let colors = Object.values(PlayerColor);
  return () => {
    num++;
    if (num > colors.length) {
      throw new Error('Too many players');
    }
    return new Player(num, `Player ${num}`, colors[num - 1]);
  };
}

function createPlayers(n: number): Player[] {
  const genPlayer = makePlayerGenerator();
  return rangeMap(n, genPlayer);
}

function createBlankGame(size: Size2d, players?: Player[], config?: GameConfig): Game {
  players = players ? players : createPlayers(2);
  return new Game(
    players,
    Board.buildBlank(size, players),
    config ? config : DEFAULT_CONFIG,
  );
}

function createGame(config: GameConfigData, size?: Size2d): Game {
  size = size ? size : { width: 10, height: 10 };
  const players = createPlayers(2);
  return new Game(
    players,
    Board.buildWithGenerals(size, players, new Map([
      [players[0], { x: 2, y: 2 }],
      [players[1], { x: 7, y: 2 }],
    ])),
    config
  );
}

function updateBoard(board: Board, playerGrid: PlayerGrid) {
  assert(playerGrid.length === board.height, 'Heights do not match');
  assert(playerGrid[0].length === board.width, 'Widths do not match');

  for (let y = 0; y < playerGrid.length; y++) {
    for (let x = 0; x < playerGrid[y].length; x++) {
      const square = playerGrid[y][x];
      if (square !== null) {
        if (isBlankSquare(board.getSquare({ x, y }))) {
          board.grid[y][x] = square;
        }
        else {
          throw new Error(`Square already occupied at (${x}, ${y})`);
        }
      }
    }
  }
}

function parsePlayerSquares(player: Player, rows: string[]): PlayerGrid {
  function mapRow(cells: string[], y: number) {
    return cells.map((cell, x) => {
      const coord = { x, y };
      if (cell === '.') {
        return null;
      }
      else if (Number.isInteger(Number(cell))) {
        return createArmyCell(coord, player.id, Number(cell));
      }
      else {
        throw new Error(`Invalid cell value: ${cell}`);
      }
    });
  }

  return rows
    .map(rowStr => rowStr.split(' ').filter(s => !!s))
    .map(mapRow);
}

export { 
  makePlayerGenerator, 
  createPlayers, 
  createBlankGame, 
  createGame, 
  updateBoard, 
  parsePlayerSquares,
  doTicks,
  doTurns,
}
