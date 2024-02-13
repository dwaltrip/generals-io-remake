import { Game } from "./game";

class GameClock {
  private game: Game;
  private intervalMs: number;
  private intervalId: number | null = null;

  constructor(game: Game, intervalMs: number) {
    this.game = game;
    this.intervalMs = intervalMs;
  }

  start() {
    if (this.intervalId !== null) {
      throw new Error('Game clock already started');
    }
    this.intervalId = window.setInterval(() => {
      this.game.tick();
    }, this.intervalMs);
  }

  stop() {
    if (this.intervalId === null) {
      console.warn('Game clock not running')
      return;
    }
    window.clearInterval(this.intervalId);
    this.intervalId = null;
  }
}

export { GameClock };
