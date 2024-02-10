import { useRef } from 'react';

import mountainIcon from './assets/mountain.svg';
import { GameGrid, SquareType, Square } from './generals/types';

import './game-board.css';

type GameBoardProps = {
  grid: GameGrid,
}

function SquareView({ square } : { square: Square }) {
  const className = `square ${square && square.type.toString().toLowerCase()}`;
  return (
    <td className={className}>
      {(square && square.type === SquareType.MOUNTAIN) &&
        <img src={mountainIcon} />
      }
    </td>
  );
}

function GameBoard({ grid }: GameBoardProps) {
  const containerRef = useRef(null);
  return (
    <div className='game-grid-container' ref={containerRef}>
      <table className='game-grid'>
        <tbody>
          {grid.map((row, y) => (
            <tr key={y}>
              {row.map((square, x) => (
                <SquareView key={x} square={square}/>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { GameBoard };
