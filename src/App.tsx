import '@/App.css'

import { Board, applyDirection } from './generals/board';
import { Game, Player, PlayerColor } from '@/generals/game';

import { GameUI } from '@/generals/ui/game';
import { ActionType, performAction } from './generals/actions';
import { Coord, Movement, Square } from './generals/types';
import { useEffect, useRef, useState } from 'react';
import { GameClock } from './generals/game-clock';
import { prettyPrintGrid } from './generals/utils';

const TICKS_PER_SECOND = 2;

function makeDummyGame() {
  const players = [
    new Player(1, 'Player 1', PlayerColor.RED),
    new Player(2, 'Player 2', PlayerColor.BLUE),
  ];

  const size = { width: 30, height: 30 };
  const game = new Game(players, Board.build(size, players), TICKS_PER_SECOND);
  const clock = new GameClock(game, Math.floor(1000 / TICKS_PER_SECOND));
  clock.start();

  const makeMove = (x: number, y: number, direction: Movement) => {
    return { type: ActionType.MOVE, args: { source: { x, y }, direction } };
  };

  function createMovementChain(start: Coord, moves: Movement[]): { source: Coord, direction: Movement }[] {
    const chain = [];
    let current = start;
    for (let move of moves) {
      chain.push({ source: current, direction: move });
      current = applyDirection(current, move);
    }
    return chain;
  }

  const generalP1 = game.board.generals.get(players[0])!;
  const { UP, DOWN, LEFT, RIGHT } = Movement;

  const actions = createMovementChain(generalP1.coord, [
    DOWN, DOWN, RIGHT, RIGHT,
    UP, UP, UP, UP, LEFT, LEFT,
  ]).map((actionArg => ({ type: ActionType.MOVE, args: actionArg })));

  window.setInterval(() => {
    const action = actions.shift();
    if (action) {
      performAction(game, action.type, action.args);
    }
  }, 500);

  return game;
}


function App() {
  const [gameTick, setGameTick] = useState(0);
  const gameRef = useRef<Game | null>(null);

  useEffect(() => {
    console.log('== Initializing game ==')
    const game = makeDummyGame();
    game.onTick(setGameTick);
    gameRef.current = game;
  }, []);

  return (
    <div className='app'>
      <p>Generals.io clone</p>
      {gameRef.current && <GameUI game={gameRef.current} />}
    </div>
  )
}

export default App
