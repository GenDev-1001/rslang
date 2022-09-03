import { FC, useEffect } from 'react';
import { ButtonReset } from '../buttons';
import { TableRow } from '../tableRow/TableRow';

import './AudioStatistics.scss';

export interface IStatistics {
  endGame: () => void;
  resetGroup: () => void;
}

const Statistics: FC<IStatistics> = ({ endGame, resetGroup }) => {
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
        <ButtonReset description="Level Reset" onClick={resetGroup} />
      </nav>
    </>
  );
};

export { Statistics };
