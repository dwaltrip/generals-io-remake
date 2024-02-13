// import { Game, Player } from "./game";
import { Game } from "./game";
import { PlayerSquare } from "./types";

enum ActionType {
  GENERAL_PRODUCTION,
  MOVE,
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

function performAction(game: Game, action: ActionType) {
  switch (action) {
    case ActionType.GENERAL_PRODUCTION:
      produceUnitsOnGenerals(game);
    case ActionType.TROOP_RECRUITMENT:
      recruitTroops(game);
      break;
    default:
      throw new Error('Invalid action type');
  }
}

// export { doGeneralProduction, ActionType };
export { performAction, ActionType };
