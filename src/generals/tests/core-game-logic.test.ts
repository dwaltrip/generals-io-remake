import { describe, it, expect } from 'vitest';
import { Game, Player, PlayerColor } from '@/generals/game';
import { Board } from '../board';

function createGame() {
  const players = [
    new Player(1, 'Player 1', PlayerColor.RED),
    new Player(2, 'Player 2', PlayerColor.BLUE),
  ];

  const size = { width: 30, height: 30 };
  const game = new Game(players, Board.buildWithRandomGenerals(size, players), 2);
  return game;
}

describe('general production', () => {
  const game = createGame();
  const doGameTicks = (n: number) => { for (let i=0; i<n; i++) game.tick(); }

  it('should have generals', () => {
    expect(game.generals.size).gt(0);
  });

  it('start with 1 troop per general', () => {
    game.generals.forEach((general) => expect(general.units).toBe(1))
  });

  it('produces 1 troop per general per turn', () => {
    doGameTicks(2);
    game.generals.forEach((general) => expect(general.units).toBe(2))
  });
});
