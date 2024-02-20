import { repeat } from '@/utils/repeat';

import { describe, it, expect } from 'vitest';
import { Game, Player, PlayerColor } from '@/generals/game';
import { Board } from '@/generals/board';

const doTicks = (game: Game, n: number) => repeat(n, () => game.tick());
const doTurns = (game: Game, n: number) => doTicks(game, n * game.config.TICKS_PER_TURN);

function createGame(): Game {
  const size = { width: 10, height: 10 };
  const players = [
    new Player(1, 'Player 1', PlayerColor.RED),
    new Player(2, 'Player 2', PlayerColor.BLUE),
  ];

  const game = new Game(
    players,
    Board.buildWithGenerals(size, players, new Map([
      [players[0], { x: 2, y: 2 }],
      [players[1], { x: 7, y: 2 }],
    ])),
    { TICKS_PER_TURN: 2, TROOP_RECRUITMENT_TURN_INTERVAL: 25 },
  );
  return game;
}

describe('general production', () => {
  const game = createGame();

  it('game should have generals', () => {
    expect(game.generals.size).gt(0);
  });

  it('should start with 1 troop per general', () => {
    game.generals.forEach((general) => expect(general.units).toBe(1))
  });

  it('should produce 1 troop per general per turn', () => {
    doTurns(game, 1);
    game.generals.forEach((general) => expect(general.units).toBe(2))

    doTurns(game, 3);
    game.generals.forEach((general) => expect(general.units).toBe(5))
  });
});
