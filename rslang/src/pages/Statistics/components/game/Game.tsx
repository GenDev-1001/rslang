import { FC } from 'react';
import './Game.scss';

export interface IGame {
  title: string;
  src: string;
}

const Game: FC<IGame> = ({ title, src }) => {
  return (
    <div className="progress-wrapper">
      <div className="game-statistics__title">
        <img src={src} alt="" className="game-statistics__icon" />
        <h2>{title}</h2>
      </div>
      <ul className="game-statistics__list">
        <li className="game-statistics__title">
          <p>0</p>
          <p>words</p>
        </li>
        <li className="game-statistics__title">
          <p>0%</p>
          <p>accuracy</p>
        </li>
        <li className="game-statistics__title">
          <p>0</p>
          <p>in a row</p>
        </li>
      </ul>
    </div>
  );
};

export { Game };
