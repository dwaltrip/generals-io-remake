import mountainIcon from '@/assets/mountain.svg';
import { SquareType, Square } from '@/generals/types';

import '@/generals/ui/game.css';
import { Game } from '@/generals/game';
import { Board } from '@/generals/board';

function GameUI({ game }: { game: Game }) {
  return (
    <div className='game-container'>
      <GameBoard board={game.board}/>
    </div>
  );
}

function GameBoard({ board }: { board: Board }) {
  const grid = board.grid;
  return (
    <div className='game-grid-container'>
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

function General() {
  return (
    <div className='general-icon'>1</div>
  );
}

function SquareView({ square } : { square: Square }) {
  const className = `square ${square && square.type.toString().toLowerCase()}`;
  if (!square) {
    throw new Error('Square is null');
  }
  return (
    <td className={className}>
      {square.type === SquareType.MOUNTAIN && <img src={mountainIcon} />}
      {square.type === SquareType.GENERAL && <General />}
    </td>
  );
}

export { GameUI };
