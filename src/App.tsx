import '@/App.css'

import { generateGrid, addPlayerGenerals } from '@/generals/generate-grid';
import { Board } from './generals/board';
import { Game, Player, PlayerColor } from '@/generals/game';

import { GameUI } from '@/generals/ui/game';

function makeDummyGame() {
  const players = [
    new Player(1, 'Player 1', PlayerColor.RED),
    new Player(2, 'Player 2', PlayerColor.BLUE),
  ];

  const GRID = generateGrid({ width: 30, height: 30 });
  const game = new Game(players, new Board(GRID));
  const generals = addPlayerGenerals(game.board.grid, players.length);

  const moves = [
    { player: players[0], source: { x: 0, y: 0 }, direction: 'RIGHT' },
    { player: players[1], source: { x: 29, y: 29 }, direction: 'LEFT' },
  ];

  return game
}

function App() {
  return (
    <div className='app'>
      <p>Generals.io clone</p>
      {/* <GameBoard grid={GRID} /> */}
      <GameUI game={makeDummyGame()} />
    </div>
  )
}

export default App
