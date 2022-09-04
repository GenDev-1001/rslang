import { FC } from 'react';
import { IWordsResponse } from '../../../../../features/words/wordsSlice.interface';
import cat from '../../../../../images/cat-speak.svg';
import './ButtonSpeak.scss';

export interface IButtonSpeak {
  rightWord: IWordsResponse | undefined;
}

const ButtonSpeak: FC<IButtonSpeak> = ({ rightWord }) => {
  const handleAudio = () => {
    const audio = new Audio(
      `https://rs-lang-team-84.herokuapp.com/${rightWord ? rightWord.audio : ''}`,
    );
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
