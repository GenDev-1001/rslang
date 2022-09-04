import { FC } from 'react';
import { wordsArrayFilds, WordsType } from '../../constants';
import cat from '../../../../images/cat-speak.svg';
import './game.scss';

export interface IWordPicture {
  rightWord: WordsType;
}

const WordPicture: FC<IWordPicture> = ({ rightWord }) => {
  const handleAudio = () => {
    const audio = new Audio(
      `https://rs-lang-team-84.herokuapp.com/${rightWord ? rightWord.audio : ''}`,
    );
    audio.play();
  };
  console.log(rightWord.image);

  return (
    <div className="word_wrapper">
      <img
        className="word_picture"
        src={`https://rs-lang-team-84.herokuapp.com/${rightWord.image}`}
        alt={rightWord.word}
      />
      <div className="word_info">
        <button
          className="audio-ui__circle audio-ui__circle_small button-cat-speak"
          onClick={handleAudio}>
          <img src={cat} alt="cat" className="button-cat-speak__img" />
        </button>
        <p>{rightWord.word} </p>
        <p>{rightWord.transcription}</p>
      </div>
    </div>
  );
};

export { WordPicture };
