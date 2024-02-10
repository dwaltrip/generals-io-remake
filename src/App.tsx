import './App.css'

import { exampleGrid } from './example-grid';
import { GameBoard } from './game-board';

const GRID = exampleGrid();

function App() {
  return (
    <div className='app'>
      <p>Generals.io clone</p>
      <GameBoard grid={GRID} />
    </div>
  )
}

export default App
