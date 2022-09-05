import cn from 'classnames';
import { UserWordStatus } from '../../common/interfaces';
import {
  useCreateUserWordMutation,
  useUpdateUserWordMutation,
} from '../../features/userWords/userWordsApiSlice';
import { useAuth } from '../../hooks/useAuth';
import { IWordCardProps } from './Card.interface';
import './Card.scss';

export function Card({
  word,
  activeColor,
  wordPlaying,
  playWordCard,
  isDictionary,
}: IWordCardProps) {
  const [updateWord] = useUpdateUserWordMutation();
  const [createUserWord] = useCreateUserWordMutation();

  const { user } = useAuth();

  const correctSprint = word.userWord?.optional.correctCountSprint || 0;
  const errorSprint = word.userWord?.optional.errorCountSprint || 0;
  const correctAudiocall = word.userWord?.optional.correctCountAudio || 0;
  const errorAudiocall = word.userWord?.optional.errorCountAudio || 0;
  const sumCorrectErrorSprint = correctSprint + errorSprint;
  const sumCorrectErrorAudiocall = correctAudiocall + errorAudiocall;

  const handlerClick = (difficulty: UserWordStatus) => {
    const optional = word?.userWord
      ? word.userWord.optional
      : {
          correctCountSprint: 0,
          errorCountSprint: 0,
          correctCountAudio: 0,
          errorCountAudio: 0,
        };

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

    playWordCard(word.id);

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
        playWordCard(null);
      }
    };
  };

  const isHard = word.userWord?.difficulty === UserWordStatus.HARD;

  const isEasy = word.userWord?.difficulty === UserWordStatus.EASY;

  return (
    <div className={cn('dictionary-words__card card', `group${activeColor}`)}>
      <div className="card-details">
        <h6 className="card-details__title">{word.word}</h6>
        <div className="card-details__translate translate">
          <span className="translate-ru">{word.wordTranslate}</span>
          <span className="translate-transcription">{word.transcription}</span>
          <button
            className={cn('translate-audio', { disabled: wordPlaying !== null })}
            disabled={wordPlaying !== null}
            onClick={handlerAudio}>
            <svg
              className={cn('translate-audio__svg', { disabled: wordPlaying !== null })}
              width="512px"
              height="512px"
              viewBox="0 0 512 512">
              <path d="M128 448Q102 448 83 429 64 410 64 384L64 256Q64 206 90 160 116 115 161 90 205 64 256 64 308 64 352 90 397 116 423 161 448 205 448 256L448 384Q448 410 429 429 410 448 384 448L320 448 320 288 400 288 400 256Q400 218 381 184 361 151 328 132 295 112 256 112 216 112 184 131 151 151 132 184 112 217 112 256L112 288 192 288 192 448 128 448Z" />
            </svg>
          </button>
        </div>
        {user.token && (
          <div className="card-details__btns">
            <button
              className={cn('card-details__btn', { active: isHard })}
              onClick={() => handlerClick(isHard ? UserWordStatus.EASY : UserWordStatus.HARD)}>
              {isHard ? 'Простое' : 'Сложное'}
            </button>
            {!isDictionary && (
              <button
                className={cn('card-details__btn', { active: isEasy })}
                onClick={() => handlerClick(isEasy ? UserWordStatus.HARD : UserWordStatus.EASY)}>
                {isEasy ? 'Изученное' : 'Не изученное'}
              </button>
            )}
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

        {user.token && (
          <div className="card-details__result">
            <h3 className="card-details__result-title">Ответы в играх:</h3>
            <div className="card-details__result-games games">
              <div className="games-block">
                <span className="games-block__name">Аудиовызов</span>
                <span className="games-block__stat">
                  {sumCorrectErrorSprint &&
                    `${correctAudiocall} из ${correctAudiocall + errorAudiocall}`}
                </span>
              </div>
              <div className="games-block">
                <span className="games-block__name">Спринт</span>
                <span className="games-block__stat">
                  {sumCorrectErrorSprint && `${correctSprint} из ${correctSprint + errorSprint}`}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <img
        className="card-img"
        src={`https://rs-lang-team-84.herokuapp.com/${word.image}`}
        alt="card img"
      />
    </div>
  );
}
