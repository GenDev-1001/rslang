import cn from 'classnames';
import { useState } from 'react';
import { UserWordStatus } from '../../common/interfaces';
import {
  useCreateUserWordMutation,
  useUpdateUserWordMutation,
} from '../../features/userWords/userWordsApiSlice';
import { useAuth } from '../../hooks/useAuth';
import { IWordCardProps } from './Card.interface';
import './Card.scss';

export function Card({ word, activeColor }: IWordCardProps) {
  const [updateWord] = useUpdateUserWordMutation();
  const [createUserWord] = useCreateUserWordMutation();
  const [wordPlaying, setWordPlaying] = useState<string | null>(null);
  const { user } = useAuth();

  const handlerClick = (difficulty: UserWordStatus) => {
    const optional = word?.userWord ? word.userWord.optional : { correctCount: 0, errorCount: 0 };
    const wordRequest = {
      word: { difficulty, optional },
      wordId: word.id,
      userId: user.userId || '',
    };

    if (word?.userWord) {
      updateWord(wordRequest);
    } else {
      createUserWord(wordRequest);
    }
  };

  const handlerAudio = () => {
    const baseUrl = 'https://rs-lang-team-84.herokuapp.com/';

    setWordPlaying(word.id);

    const audioList = [
      `${baseUrl}${word.audio}`,
      `${baseUrl}${word.audioMeaning}`,
      `${baseUrl}${word.audioExample}`,
    ];

    const audio = new Audio(audioList[0]);
    audio.play();

    let index = 1;
    audio.onended = () => {
      if (index < audioList.length) {
        audio.src = audioList[index];
        audio.play();
        index += 1;
      } else {
        setWordPlaying(null);
      }
    };
  };

  const isHard = word.userWord?.difficulty === UserWordStatus.HARD;
  const isWorking = word.userWord?.difficulty === UserWordStatus.WORK;

  return (
    <div className={cn('dictionary-words__card card', `group${activeColor}`)}>
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
        {user.token && (
          <div className="card-details__btns">
            <button
              className={cn('card-details__btn', { active: isHard })}
              onClick={() => handlerClick(isHard ? UserWordStatus.WORK : UserWordStatus.HARD)}>
              {isHard ? 'Простое' : 'Сложное'}
            </button>
            <button
              className={cn('card-details__btn', { active: isWorking })}
              onClick={() => handlerClick(isWorking ? UserWordStatus.WORK : UserWordStatus.NULL)}>
              {!isWorking && !isHard ? 'В изученное' : 'Не изученное'}
            </button>
          </div>
        )}
        <h3 className="card-details__text-title">Пример:</h3>
        <div className="card-details__text-en text-en">
          <div className="text-en__first" dangerouslySetInnerHTML={{ __html: word.textExample }} />
          <div className="text-en__second">{word.textExampleTranslate}</div>
        </div>
        <div className="text-en__line" />
        <h3 className="card-details__text-title">Значение:</h3>
        <div className="card-details__text-ru text-ru">
          <div className="text-ru__first" dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
          <div className="text-ru__second">{word.textMeaningTranslate}</div>
        </div>
        <div className="card-details__result">
          <h3 className="card-details__result-title">Ответы в играх:</h3>
          <div className="card-details__result-games games">
            <div className="games-block">
              <span className="games-block__name">Аудиовызов</span>
              <span className="games-block__stat">0</span>
            </div>
            <div className="games-block">
              <span className="games-block__name">Спринт</span>
              <span className="games-block__stat">0</span>
            </div>
          </div>
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
