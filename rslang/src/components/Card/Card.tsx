import { IWordCardProps } from './Card.interface';
import './Card.scss';

export function Card({ word }: IWordCardProps) {
  const handlerAudio = () => {
    const audio = new Audio(`https://rs-lang-team-84.herokuapp.com/${word.audio}`);
    audio.play();
  };

  return (
    <div className="dictionary-words__card card">
      <div className="card-details">
        <h6 className="card-details__title">{word.word}</h6>
        <div className="card-details__translate translate">
          <span className="translate-ru">{word.wordTranslate}</span>
          <span className="translate-transcription">{word.transcription}</span>
          <button className="translate-audio">
            <svg
              className="translate-audio__svg"
              width="512px"
              height="512px"
              onClick={handlerAudio}
              viewBox="0 0 512 512">
              <path d="M128 448Q102 448 83 429 64 410 64 384L64 256Q64 206 90 160 116 115 161 90 205 64 256 64 308 64 352 90 397 116 423 161 448 205 448 256L448 384Q448 410 429 429 410 448 384 448L320 448 320 288 400 288 400 256Q400 218 381 184 361 151 328 132 295 112 256 112 216 112 184 131 151 151 132 184 112 217 112 256L112 288 192 288 192 448 128 448Z" />
            </svg>
          </button>
        </div>
        <div className="card-details__btns">
          <button className="card-details__btn">Сложное</button>
          <button className="card-details__btn">Изученное</button>
        </div>
        <div className="card-details__text-en text-en">
          <div className="text-en__first">{`${word.textMeaning}`}</div>
          <div className="text-en__second">{word.textExample}</div>
        </div>
        <div className="text-en__line" />
        <div className="card-details__text-ru text-ru">
          <div className="text-ru__first">{word.textMeaningTranslate}</div>
          <div className="text-ru__second">{word.textExampleTranslate}</div>
        </div>
      </div>
      <img
        className="card-img"
        src={`https://rs-lang-team-84.herokuapp.com/${word.image}`}
        alt="card img"
      />
    </div>
  );
}
