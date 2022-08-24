import { FC } from 'react';
import './Game.scss';

export interface IGame {
  title: string;
  src: string;
}

const Game: FC<IGame> = ({ title, src }) => {
  return (
    <div className="progress-wrapper">
      <img src={src} alt="" />
      <h2>{title}</h2>
    </div>
  );
};

export { Game };
