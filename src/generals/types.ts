
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
  coord: Coord;
}

interface PlayerSquare extends Square {
  type: PlayerSquareType;
  playerId: number;
  units: number;
}

type GameGrid = Square[][];

type Coord = { x: number; y: number; };

enum Movement {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export {
  PlayerSquareType,
  NeutralSquareType,
  SquareType,
  type Square,
  type PlayerSquare,
  type GameGrid,
  type Coord,
  Movement,
};
