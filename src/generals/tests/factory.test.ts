import { describe, it, expect } from 'vitest';

import { Square, PlayerSquareType } from '@/generals/types';
import { isPlayerSquare } from '@/generals/square';
import {
  createBlankGame,
  createPlayers,
  parsePlayerSquares,
  updateBoard,
} from '@/generals/tests/factory';

describe('parsePlayerSquares and updateBoard', () => {
  const players = createPlayers(2);
  const gridP1 = parsePlayerSquares(players[0], [
    '.  1 1 .',
    '.  1 1 .',
  ]);
  const size = { width: gridP1[0].length, height: gridP1.length };
  const game = createBlankGame(size, players);
  updateBoard(game.board, gridP1);

  function expectArmySquareWithOneTroop(square: Square) {
    if (!isPlayerSquare(square)) { throw new Error('Not a player square'); }
    expect(square.type).toBe(PlayerSquareType.ARMY);
    expect(square.playerId).toBe(players[0].id);
    expect(square.units).toBe(1);
  }

  it('should produce the correct # of army squares', () => {
    expect(game.board.allSquares().filter(
      (square) => isPlayerSquare(square) && square.type === PlayerSquareType.ARMY
    ).length).toBe(4);
  });

  it('should produce squares with the correct # of units', () => {
    const coords = [[0, 1], [0, 2], [1, 1], [1, 2]];
    coords.forEach(([y, x]) => {
      expectArmySquareWithOneTroop(game.board.getSquare({ x, y }));
    });
  });
});
