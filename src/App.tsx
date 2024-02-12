import '@/App.css'

import { Board } from './generals/board';
import { Game, Player, PlayerColor } from '@/generals/game';

import { GameUI } from '@/generals/ui/game';
import { ActionType, performAction } from './generals/actions';
import { Movement } from './generals/types';
import { useEffect, useRef, useState } from 'react';

function makeDummyGame(render: () => void) {
  const players = [
    new Player(1, 'Player 1', PlayerColor.RED),
    new Player(2, 'Player 2', PlayerColor.BLUE),
  ];

  const size = { width: 30, height: 30 };
  const game = new Game(players, Board.build(size, players));

  // const makeMove = (player: Player, x: number, y: number, dir: Movement) => {
  //   return { type: ActionType.MOVE, args: { player, source: { x, y }, dir } };
  // };
  // const moveP1 = (...args) => makeMove(players[0], ...args);

  const actions = [
    { type: ActionType.GENERAL_PRODUCTION },
    { type: ActionType.GENERAL_PRODUCTION },
    { type: ActionType.GENERAL_PRODUCTION },
    // moveP1(0, 0, Movement.RIGHT),
    // moveP1(0, 1, Movement.RIGHT),
    // moveP1(0, 2, Movement.RIGHT),
  ];
  
  window.setInterval(() => {
    const action = actions.shift();
    if (action) {
      console.log('Performing action', action.type)
      performAction(game, action.type);
    }
    render();
  }, 1000);

  return game;
}


function App() {
  const [plzRender, setPlzRender] = useState(0);
  const gameRef = useRef<Game | null>(null);

  useEffect(() => {
    console.log('Creating game')
    const render = () => setPlzRender(Math.random());
    gameRef.current = makeDummyGame(render);
    render();
  }, []);

  return (
    <div className='app'>
      <p>Generals.io clone</p>
      {gameRef.current && <GameUI game={gameRef.current} />}
    </div>
  )
}

export default App
