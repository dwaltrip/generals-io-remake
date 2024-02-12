import mountainIcon from '@/assets/mountain.svg';
import generalIcon from '@/assets/crown.png';

import { SquareType, Square, PlayerSquare } from '@/generals/types';

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

function ArmyCount({ count } : { count: number }){
  return <span className='army-count'>{count}</span>;
}

function General({ square } : { square: PlayerSquare }) {
  return (
    <div className='general-icon'>
      <img className='general-img' src={generalIcon} /> 
      <ArmyCount count={square.units} />
    </div>
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
      {square.type === SquareType.GENERAL && 
        <General square={square as PlayerSquare} />
      }
    </td>
  );
}

export { GameUI };
