import { FC } from 'react';
import { ButtonReset } from '../buttons';
import { TableRow } from '../tableRow/TableRow';
import './AudioStatistics.scss';

interface IAudioStatistics {
  statistics: {
    id: string;
    word: string;
    audio: string;
    transcription: string;
    wordTranslate: string;
    answer: boolean;
  }[];
  endGame: () => void;
  resetGame: () => void;
}

const AudioStatistics: FC<IAudioStatistics> = ({ statistics, endGame, resetGame }) => {
  return (
    <>
      <div className="audio-frame audio-table__wrapper">
        <h2 className="audio-frame__header">Statistics</h2>
        <table className="audio-table">
          <tbody>
            {statistics.length > 0 &&
              statistics.map(({ id, audio, word, wordTranslate, transcription, answer }) => {
                return (
                  <TableRow
                    key={id}
                    audio={audio}
                    word={word}
                    wordTranslate={wordTranslate}
                    transcription={transcription}
                    answer={answer}
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
