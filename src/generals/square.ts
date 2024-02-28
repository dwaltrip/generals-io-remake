import { Square, PlayerSquareType, PlayerSquare, NeutralSquare, NeutralSquareType } from "./types";

// TODO: is this the best way to do this?
function isSquare(obj: any): obj is Square {
  return obj && 'type' in obj && 'coord' in obj;
}

function isPlayerSquare(square: Square): square is PlayerSquare {
  return square.type in PlayerSquareType;
}

function isNeutralSquare(square: Square): square is NeutralSquare {
  return square.type in NeutralSquareType;
}

// --------------------

function isBlankSquare(square: Square): boolean {
  return square.type === NeutralSquareType.BLANK;
}

function isMountainSquare(square: Square): boolean {
  return square.type === NeutralSquareType.MOUNTAIN;
}

function isNeutralCitySquare(square: Square): boolean {
  return square.type === NeutralSquareType.NEUTRAL_CITY;
}

function isArmySquare(square: Square): square is PlayerSquare {
  return square.type === PlayerSquareType.ARMY;
}

function isPlayerCitySquare(square: Square): square is PlayerSquare {
  return square.type === PlayerSquareType.PLAYER_CITY;
}

function isGeneralSquare(square: Square): square is PlayerSquare {
  return square.type === PlayerSquareType.GENERAL;
}

export {
  isSquare,
  isPlayerSquare,
  isNeutralSquare,
  isBlankSquare,
  isMountainSquare,
  isNeutralCitySquare,
  isArmySquare,
  isPlayerCitySquare,
  isGeneralSquare,
}
