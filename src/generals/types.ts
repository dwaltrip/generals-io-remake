
enum PlayerSquareType {
  GENERAL = 'GENERAL',
  ARMY = 'ARMY',
  PLAYER_CITY = 'PLAYER_CITY',
}

enum NeutralSquareType {
  BLANK = 'BLANK',
  MOUNTAIN = 'MOUNTAIN',
  NEUTRAL_CITY = 'NEUTRAL_CITY',
}

const SquareType = { ...PlayerSquareType, ...NeutralSquareType };
type SquareType = PlayerSquareType | NeutralSquareType;

interface Square {
  type: SquareType;
  x: number;
  y: number;
}

interface PlayerSquare extends Square {
  type: PlayerSquareType;
  playerId: number;
  units: number;
}

type GameGrid = Square[][];

export {
  PlayerSquareType,
  NeutralSquareType,
  SquareType,
  type Square,
  type PlayerSquare,
  type GameGrid,
};
