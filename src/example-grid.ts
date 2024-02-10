import { generateGrid, CellGrid, CellType } from './generals/game';

function exampleGrid(): CellGrid {
  return generateGrid({ width: 30, height: 30 });
}

function prettyPrintGrid(grid: CellGrid) {
  const prettyGrid = grid.map(row => {
    return row.map(cell => {
      if (!cell) return '.';
      return cell.type === CellType.MOUNTAIN ? '#' : ' ';
    }).join('');
  }).join('\n');
  console.log('--- grid ---\n');
  console.log(prettyGrid)
}

export { exampleGrid };
