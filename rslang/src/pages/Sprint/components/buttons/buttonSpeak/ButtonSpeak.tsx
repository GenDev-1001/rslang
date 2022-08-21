import { FC } from 'react';
import cat from '../../../../../images/cat-speak.svg';
import './ButtonSpeak.scss';

const ButtonSpeak: FC = () => {
  return (
    <button className="sprint-ui__circle sprint-ui__circle_small button-cat-speak">
      <img src={cat} alt="cat" className="button-cat-speak__img" />
    </button>
  );
};

export { ButtonSpeak };
