import { useRef } from 'react';

import mountainIcon from './assets/mountain.svg';
import { CellGrid, CellType, MaybeCell, cellTypeToStr } from './generals/game';

import './game-board.css';

type GameBoardProps = {
  grid: CellGrid;
}

function CellView({ cell } : { cell: MaybeCell }) {
  const className = `cell ${cell ? cellTypeToStr(cell.type) : ''}`;
  return (
    <td className={className}>
      {(cell && cell.type === CellType.MOUNTAIN) &&
        <img src={mountainIcon} />
      }
    </td>
  );
}

function GameBoard({ grid }: GameBoardProps) {
  const containerRef = useRef(null);
  return (
    <div className="game-grid-container" ref={containerRef}>
      <table className='game-grid'>
        <tbody>
          {grid.map((row, y) => (
            <tr key={y}>
              {row.map((cell, x) => (
                <CellView key={x} cell={cell}/>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { GameBoard };
