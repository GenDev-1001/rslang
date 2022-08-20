import { ButtonReset } from '../buttons';
import { TableRow } from '..';
import './Statistics.scss';

export interface IStatistics {
  endGame: () => void;
  resetLevel: () => void;
}

export function Statistics({ endGame, resetLevel }: IStatistics) {
  return (
    <>
      <div className="sprint-frame sprint-table__wrapper">
        <h2 className="sprint-frame__header">Statistics</h2>
        <table className="sprint-table">
          <tbody>
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
          </tbody>
        </table>
      </div>
      <nav className="button-menu">
        <ButtonReset description="Play Again" bgColor="bg_green" onClick={endGame} />
        <ButtonReset description="Level Reset" onClick={resetLevel} />
      </nav>
    </>
  );
}
