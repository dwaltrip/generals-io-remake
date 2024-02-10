import './App.css'

import { generateGrid } from './generals/generate-grid';
import { GameBoard } from './game-board';

const GRID = generateGrid({ width: 30, height: 30 });

function App() {
  return (
    <div className='app'>
      <p>Generals.io clone</p>
      <GameBoard grid={GRID} />
    </div>
  )
}

export default App
