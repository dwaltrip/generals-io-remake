import { describe, expect, test, beforeEach, assert } from 'vitest';

import { Movement } from '@/generals/types';
import { Game, Player } from '@/generals/game';
import { isArmySquare, isBlankSquare } from '@/generals/square';

import {
  createBlankGame,
  createPlayers,
  parsePlayerSquares,
  updateBoard,
} from '@/generals/tests/factory';
import { ActionType, performAction } from '../actions';
import { applyDirection } from '../board';

describe('basic movement', () => {
  let game: Game;
  let players: Player[];

  beforeEach(() => {
    players = createPlayers(2);
    game = createBlankGame({ width: 2, height: 2 }, players);
  });

  test('should be able to move to blank square if has 2+ units', () => {
    const p1 = players[0];
    updateBoard(game.board, parsePlayerSquares(p1, [
      '2 .',
      '. .',
    ]));

    const army = game.board.getSquare({ x: 0, y: 0 });
    const direction = Movement.RIGHT;
    const targetCoord = applyDirection(army.coord, direction);
    const getDest = () => game.board.getSquare(targetCoord);

    assert(isArmySquare(army), 'Expected player square');
    expect(isBlankSquare(getDest())).toBe(true);

    performAction(game, ActionType.MOVE, { source: army.coord, direction });

    const dest = getDest();
    assert(isArmySquare(army), 'Expected army square');
    assert(isArmySquare(dest), 'source should still be army square');
    expect(dest.playerId).toBe(p1.id);
    expect(dest.units).toEqual(army.units);

    expect(army.units).toBe(1);
    expect(dest.units).toBe(1);
  });
});
