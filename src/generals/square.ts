import { Square, PlayerSquareType, PlayerSquare } from "./types";

function isPlayerSquare(square: Square): square is PlayerSquare {
  return (
    square.type === PlayerSquareType.PLAYER_CITY ||
    square.type === PlayerSquareType.GENERAL ||
    square.type === PlayerSquareType.ARMY
  );
}

export { isPlayerSquare };
