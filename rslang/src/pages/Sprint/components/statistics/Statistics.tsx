import { FC } from 'react';
import { ButtonReset } from '../buttons';
import { TableRow } from '..';
import './Statistics.scss';

export interface IStatistics {
  statistics: {
    id: string;
    word: string;
    audio: string;
    transcription: string;
    wordTranslate: string;
    result: boolean;
  }[];
  endGame: () => void;
  resetGame: () => void;
}

const Statistics: FC<IStatistics> = ({ statistics, endGame, resetGame }) => {
  return (
    <>
      <div className="sprint-frame sprint-table__wrapper">
        <h2 className="sprint-frame__header">Statistics</h2>
        <table className="sprint-table">
          <tbody>
            {statistics.length > 0 &&
              statistics.map(({ id, audio, word, wordTranslate, transcription, result }) => {
                return (
                  <TableRow
                    key={id}
                    audio={audio}
                    word={word}
                    wordTranslate={wordTranslate}
                    transcription={transcription}
                    result={result}
                  />
                );
              })}
            {statistics.length === 0 && (
              <h2 className="sprint-frame__error">
                You could not manage to choose a single word, try again!
              </h2>
            )}
          </tbody>
        </table>
      </div>
      <nav className="button-menu">
        <ButtonReset description="Play Again" bgColor="bg_green" onClick={endGame} />
        <ButtonReset description="Level Reset" onClick={resetGame} />
      </nav>
    </>
  );
};

export { Statistics };
