import { FC } from 'react';
import { IStatistic } from '../../../../features/statistic/statisticApiSlice.interface';
import './Game.scss';

export interface IGame {
  title: string;
  src: string;
  statistics: IStatistic[];
}

const Game: FC<IGame> = ({ title, src, statistics }) => {
  const countWords = (games: IStatistic[], nameGame?: string): number => {
    const countSet = new Set();
    games.forEach((game) => {
      if (nameGame ? game.name === nameGame : true) {
        game.wordsTrue.concat(game.wordsFalse).forEach((id) => countSet.add(id));
      }
    });
    return countSet.size;
  };

  const percentTrueWords = (games: IStatistic[], nameGame?: string): number => {
    let wordsTrue = 0;
    let wordsFalse = 0;
    games.forEach((game) => {
      if (nameGame ? game.name === nameGame : true) {
        wordsTrue += game.wordsTrue.length;
        wordsFalse += game.wordsFalse.length;
      }
    });
    return Math.round((wordsTrue * 100) / (wordsTrue + wordsFalse)) || 0;
  };

  const seriesWords = (games: IStatistic[], nameGame?: string): number => {
    let series = 0;
    games.forEach((game) => {
      if (game.seriesTrueAnswers > series && (nameGame ? game.name === nameGame : true))
        series = game.seriesTrueAnswers;
    });
    return series;
  };

  return (
    <div className="progress-wrapper">
      <div className="game-statistics__title">
        <img src={src} alt="" className="game-statistics__icon" />
        <h2>{title}</h2>
      </div>
      <ul className="game-statistics__list">
        <li className="game-statistics__title">
          <p>
            {title === 'Sprint'
              ? countWords(statistics, 'sprint')
              : countWords(statistics, 'audiocall')}
          </p>
          <p>words</p>
        </li>
        <li className="game-statistics__title">
          <p>
            {title === 'Sprint'
              ? `${percentTrueWords(statistics, 'sprint')}%`
              : `${percentTrueWords(statistics, 'audiocall')}%`}
          </p>
          <p>accuracy</p>
        </li>
        <li className="game-statistics__title">
          <p>
            {title === 'Sprint'
              ? seriesWords(statistics, 'sprint')
              : seriesWords(statistics, 'audiocall')}
          </p>
          <p>in a row</p>
        </li>
      </ul>
    </div>
  );
};

export { Game };
