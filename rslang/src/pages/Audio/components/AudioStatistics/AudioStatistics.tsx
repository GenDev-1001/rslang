import { FC } from 'react';
import { ButtonReset } from '../buttons';
import { TableRow } from '../tableRow/TableRow';
import { IAudioStatistics } from './AudioStatistics.interface';
import './AudioStatistics.scss';

const AudioStatistics: FC<IAudioStatistics> = ({ statistics, endGame, resetGame }) => {
  return (
    <>
      <div className="audio-frame audio-table__wrapper">
        <h2 className="audio-frame__header">Statistics</h2>
        <table className="audio-table">
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
              <tr>
                <td>
                  <p className="audio-frame__error">
                    You could not manage to choose a single word, try again!
                  </p>
                </td>
              </tr>
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

export { AudioStatistics };
