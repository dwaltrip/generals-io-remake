import { Square, PlayerSquareType, PlayerSquare, NeutralSquare, NeutralSquareType } from "./types";

function isPlayerSquare(square: Square): square is PlayerSquare {
  return square.type in PlayerSquareType;
}

function isNeutralSquare(square: Square): square is NeutralSquare {
  return square.type in NeutralSquareType;
}

export { isPlayerSquare, isNeutralSquare };
