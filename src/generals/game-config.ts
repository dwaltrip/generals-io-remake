
interface GameConfigData {
  TICKS_PER_TURN: number;
  TROOP_RECRUITMENT_TURN_INTERVAL: number;
}

class GameConfig {
  TICKS_PER_TURN: number;
  TROOP_RECRUITMENT_TURN_INTERVAL: number;

  constructor( 
    ticks_per_turn: number, 
    troop_recruitment_turn_interval: number 
  ) {
    this.TICKS_PER_TURN = ticks_per_turn;
    this.TROOP_RECRUITMENT_TURN_INTERVAL = troop_recruitment_turn_interval;
  }

  static fromData(data: GameConfigData) {
    return new GameConfig(
      data.TICKS_PER_TURN,
      data.TROOP_RECRUITMENT_TURN_INTERVAL,
    );
  }
}

export { type GameConfigData, GameConfig };
