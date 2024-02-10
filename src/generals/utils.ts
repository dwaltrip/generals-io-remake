import { SquareType, GameGrid } from './types';

function prettyPrintGrid(grid: GameGrid) {
  const prettyGrid = grid.map(row => {
    return row.map(cell => {
      if (!cell) return '.';
      return cell.type === SquareType.MOUNTAIN ? '#' : ' ';
    }).join('');
  }).join('\n');
  console.log('--- grid ---\n');
  console.log(prettyGrid)
}

export { prettyPrintGrid };
