
type Coord = { x: number; y: number; };

type Size2d = { width: number; height: number; };

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

interface _BaseSquare {
  coord: Coord;
}

interface NeutralSquare extends _BaseSquare {
  type: NeutralSquareType;
}

interface PlayerSquare extends _BaseSquare {
  type: PlayerSquareType;
  playerId: number;
  units: number;
}

type Square = NeutralSquare | PlayerSquare;

type GameGrid = Square[][];

enum Movement {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export {
  type Coord,
  type Size2d,

  NeutralSquareType,
  PlayerSquareType,
  SquareType,

  type NeutralSquare,
  type PlayerSquare,
  type Square,

  type GameGrid,
  Movement,
};
