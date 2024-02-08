import { generateGrid, CellType } from './generals/game';
import './App.css'

const grid = generateGrid({ width: 30, height: 30 });
const prettyGrid = grid.map(row => {
  return row.map(cell => {
    if (!cell) return '.';
    return cell.type === CellType.MOUNTAIN ? '#' : ' ';
  }).join('');
}).join('\n');

console.log('--- grid ---\n');
console.log(prettyGrid)

function App() {
  return (
    <>
      <div>
        Generals.io clone
      </div>
    </>
  )
}

export default App
