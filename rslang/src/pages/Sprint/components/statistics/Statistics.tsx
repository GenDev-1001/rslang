import { ButtonReset } from '../buttons';
import './Statistics.scss';

export interface IStatistics {
  endGame: () => void;
  resetLevel: () => void;
}

export function Statistics({ endGame, resetLevel }: IStatistics) {
  return (
    <>
      <div className="sprint-frame">
        <h2 className="sprint-frame__header">Statistics</h2>
      </div>
      <nav className="button-menu">
        <ButtonReset description="Play Again" bgColor="bg_green" onClick={endGame} />
        <ButtonReset description="Level Reset" onClick={resetLevel} />
      </nav>
    </>
  );
}
