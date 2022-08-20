import cat from '../../../../../images/cat-speak.svg';
import './ButtonSpeak.scss';

export function ButtonSpeak() {
  return (
    <button className="sprint-ui__circle sprint-ui__circle_small button-cat-speak">
      <img src={cat} alt="cat" className="button-cat-speak__img" />
    </button>
  );
}
