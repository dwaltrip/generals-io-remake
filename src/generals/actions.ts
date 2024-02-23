// import { Game, Player } from "./game";
import { Game } from "./game";
import { isPlayerSquare } from "./square";
import { Coord, Movement, PlayerSquare, PlayerSquareType, SquareType } from "./types";

enum ActionType {
  // UI only actions (doesn't affect game state)
  SELECT_SQUARE,

  // User actions
  MOVE,

  // Automatic actions
  GENERAL_PRODUCTION,
  TROOP_RECRUITMENT,
}

function produceUnitsOnGenerals(game: Game) {
  game.board.generals.forEach((square: PlayerSquare) => {
    square.units += 1;
  });
}

// ---------------------------------
// TODO: This is very inefficient!!
// ---------------------------------
function recruitTroops(game: Game) {
  game.players.forEach(player => {
    game.forEachSquareForPlayer(player, square => {
      square.units += 1;
    });
  });
}

// TODO: write tests for this
function handleMove(game: Game, sourceCoord: Coord, direction: Movement) {
  const board = game.board;
  if (!board.canMove(sourceCoord, direction)) {
    console.warn('[handleMove] Cannot move');
    return; 
  }

  const source = board.getSquare(sourceCoord);
  if (!isPlayerSquare(source)) {
    throw new Error('Source is not a player square');
  }
  const dest = board.getSquare(sourceCoord, direction);

  if (source.units < 2) {
    console.warn('[handleMove] Not enough units to move');
    return;
  }

  // Case 1: dest is blank
  if (dest.type === SquareType.BLANK) {
    const newDest = {
      ...dest,
      type: SquareType.ARMY,
      playerId: source.playerId,
      units: source.units - 1,
    };
    source.units = 1;
    board.replaceSquare(dest.coord, newDest);
    return;
  }
  else if (!isPlayerSquare(dest)) {
    throw new Error('Destination is not a player square');
  }

  // Case 2: dest is friendly
  if (dest.playerId === source.playerId) {
    dest.units += source.units - 1;
    source.units = 1;
  }

  // Case 3: dest is enemy
  else if (dest.playerId !== source.playerId) {

    // Case 3a: Enemy defends successfully
    if (source.units <= dest.units) {
      dest.units -= source.units;
      source.units = 0;
    }
    // Case 3b: Regular enemy square is captured
    else {
      const defeatedPlayer = game.getPlayer(dest.playerId);
      const surivingUnits = source.units - dest.units;
      dest.units = surivingUnits - 1;
      source.units = 1;
      dest.playerId = source.playerId;

      // Case 3c: Enemy general is captured
      if (dest.type === PlayerSquareType.GENERAL) {
        dest.type = PlayerSquareType.PLAYER_CITY;

        for (let square of game.board.iterPlayerSquares(defeatedPlayer)) {
          square.playerId = source.playerId;
          if (square != dest) {
            square.units = Math.ceil(square.units / 2);
          }
        }
      }
    }
  }
}

// TODO: This is bad!!! args is untyped...
// Already caused a bug in the tests
function performAction(game: Game, action: ActionType, args?: any) {
  switch (action) {
    case ActionType.GENERAL_PRODUCTION:
      produceUnitsOnGenerals(game);
      break;
    case ActionType.TROOP_RECRUITMENT:
      recruitTroops(game);
      break;
    case ActionType.MOVE:
      handleMove(game, args.source, args.direction);
      break;
    default:
      throw new Error('Invalid action type');
  }
}

// export { doGeneralProduction, ActionType };
export { performAction, ActionType };
