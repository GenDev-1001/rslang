import { FC } from 'react';
import cat from '../../../../../images/cat-speak.svg';
import { WordsType } from '../../../constants';
import './ButtonSpeak.scss';

export interface IButtonSpeak {
  audioLink?: undefined | string;
}

const ButtonSpeak: FC<IButtonSpeak> = ({ audioLink }) => {
  const handleAudio = () => {
    const audio = new Audio(`https://rs-lang-team-84.herokuapp.com/${audioLink || ''}`);
    audio.play();
  };

  return (
    <button
      className="sprint-ui__circle sprint-ui__circle_small button-cat-speak"
      onClick={handleAudio}>
      <img src={cat} alt="cat" className="button-cat-speak__img" />
    </button>
  );
};

export { ButtonSpeak };
