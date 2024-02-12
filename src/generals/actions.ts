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
  const generals = new Array(...game.board.generals.values());
  console.log('General counts:', generals.map(g => g.units));
}

function performAction(game: Game, action: ActionType) {
  switch (action) {
    case ActionType.GENERAL_PRODUCTION:
      produceUnitsOnGenerals(game);
      break;
    default:
      throw new Error('Invalid action type');
  }
}

// export { doGeneralProduction, ActionType };
export { performAction, ActionType };
