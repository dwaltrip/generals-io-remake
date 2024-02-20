import { describe, expect, test, beforeEach } from 'vitest';

import { PlayerSquareType } from '@/generals/types';
import { Game, Player } from '@/generals/game';
import { isPlayerSquare } from '@/generals/square';
import { GameConfig } from '@/generals/game-config';

import {
  createBlankGame,
  createGame,
  createPlayers,
  doTurns,
  parsePlayerSquares,
  updateBoard,
} from '@/generals/tests/factory';

describe('general production', () => {
  let game: Game;

  beforeEach(() => {
    game = createGame(new GameConfig(2, 200));
  });

  test('game should have generals', () => {
    expect(game.generals.size).toBeGreaterThan(0);
  });

  test.each([
    { turns: 0, expUnits: 1 },
    { turns: 1, expUnits: 2 },
    { turns: 4, expUnits: 5 },
    { turns: 20, expUnits: 21 },
    { turns: 123, expUnits: 124 },
  ])(
    'should have $expUnits units per general after $turns turn(s)',
    ({ turns, expUnits }) => {
      doTurns(game, turns);
      game.generals.forEach(general => expect(general.units).toBe(expUnits));
    },
  );
});

describe('troop recruitment', () => {
  const RECRUIT_INTERVAL = 5;

  let game : Game;
  let players : Player[];

  function getArmySquares() {
    return game.board.allSquares()
      .filter(isPlayerSquare)
      .filter(s => s.type === PlayerSquareType.ARMY);
  }

  beforeEach(() => {
    players = createPlayers(2);
    const gridP1 = parsePlayerSquares(players[0], [
      '1 . .',
      '1 . .',
    ]);
    const gridP2 = parsePlayerSquares(players[1], [
      '. . 1',
      '. . 1',
    ]);
    const size = { width: gridP1[0].length, height: gridP1.length };
    game = createBlankGame(size, players, new GameConfig(2, RECRUIT_INTERVAL));
    updateBoard(game.board, gridP1);
    updateBoard(game.board, gridP2);
  });

  // ---------------------------------------------------------------------------

  test('should start with 1 troop per army square', () => {
    const armies = getArmySquares();
    expect(armies.length).toBeGreaterThan(0);
    armies.forEach(square => expect(square.units).toBe(1));
  });

  test.each([
    { turns: 0, expUnits: 1 },
    { turns: 1, expUnits: 1 },

    { turns: RECRUIT_INTERVAL * 1, expUnits: 2 },
    { turns: RECRUIT_INTERVAL * 1 + 1, expUnits: 2 },

    { turns: RECRUIT_INTERVAL * 2, expUnits: 3 },
    { turns: RECRUIT_INTERVAL * 2 + 1, expUnits: 3 },

    { turns: RECRUIT_INTERVAL * 9, expUnits: 10 },
    { turns: RECRUIT_INTERVAL * 9 + 1, expUnits: 10 },
  ])(
    'should have $expUnits troops per square after $turns turns',
    ({ turns, expUnits }) => {
      doTurns(game, turns);
      const armies = getArmySquares();
      expect(armies.length).toBeGreaterThan(0);
      armies.forEach(square => expect(square.units).toBe(expUnits));
    },
  );
});
