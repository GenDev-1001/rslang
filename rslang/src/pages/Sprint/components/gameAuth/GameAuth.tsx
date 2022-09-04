import { FC, MouseEvent, useEffect, useState } from 'react';
import { ButtonReset, ButtonSelect, ButtonSpeak, Circle, Multiplier } from '..';
import { UserWordStatus } from '../../../../common/interfaces';
import { random } from '../../../../common/utils/random';
import { IActivePaginatedResult } from '../../../../features/aggregaredWords/aggregaredWordsApiSlice.inteface';
import {
  useCreateUserWordMutation,
  useUpdateUserWordMutation,
} from '../../../../features/userWords/userWordsApiSlice';
import { useAuth } from '../../../../hooks/useAuth';
import { IStatistics } from '../../Sprint';

export interface IGameAuth {
  data: IActivePaginatedResult[] | undefined;
  arrayOfCoins: boolean[];
  page: number;
  group: number;
  resetGame: () => void;
  handleIsEndGame: (value: boolean) => void;
  handleStatistics: ({
    id,
    audio,
    word,
    wordTranslate,
    transcription,
    result,
  }: IStatistics) => void;
  handlePage: () => void;
  handleTimeStartGame: () => void;
  handleTimeEndGame: () => void;
}

const GameAuth: FC<IGameAuth> = ({
  data,
  arrayOfCoins,
  page,
  group,
  resetGame,
  handleIsEndGame,
  handleStatistics,
  handlePage,
  handleTimeStartGame,
  handleTimeEndGame,
}) => {
  const [timer, setTimer] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const [arrayOfCounters, setArrayOfCounters] = useState<number[]>([]);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [englishWord, setEnglishWord] = useState<string>('');
  const [englishWordTranslation, setEnglishWordTranslation] = useState<string>('');
  const [randomWordTranslation, setRandomWordTranslation] = useState<string>('');

  const { user } = useAuth();

  const [updateWord] = useUpdateUserWordMutation();
  const [createUserWord] = useCreateUserWordMutation();

  const getEnglishWord = () => {
    const word = data ? data[wordIndex].word : '';
    const wordTranslate = data ? data[wordIndex].wordTranslate : '';
    setEnglishWord(word);
    setEnglishWordTranslation(wordTranslate);
  };

  const getRandomWordTranslation = () => {
    const randomNumber = random(0, 20);
    const randomTranslation = data ? data[randomNumber].wordTranslate : '';
    setRandomWordTranslation(randomTranslation);
  };

  const handleWordIndex = () => {
    if (wordIndex < 19) {
      setWordIndex(wordIndex + 1);
    } else {
      setWordIndex(0);
      handlePage();

      if (!page) {
        handleIsEndGame(true);
        handleTimeEndGame();
      }
    }
  };

  const handleAccuracy = (value: boolean) => {
    const word = data![wordIndex];

    let correctCountSprintValue = word?.userWord ? word?.userWord.optional.correctCountSprint : 0;
    let errorCountSprintValue = word?.userWord ? word?.userWord.optional.errorCountSprint : 0;
    const correctCountAudioValue = word?.userWord ? word?.userWord.optional.correctCountAudio : 0;
    const errorCountAudioValue = word?.userWord ? word?.userWord.optional.errorCountAudio : 0;

    const optional = {
      correctCountSprint: value ? (correctCountSprintValue += 1) : correctCountSprintValue,
      errorCountSprint: !value ? (errorCountSprintValue += 1) : errorCountSprintValue,
      correctCountAudio: correctCountAudioValue,
      errorCountAudio: errorCountAudioValue,
    };

    const wordRequest = {
      word: {
        difficulty:
          correctCountSprintValue === 5 && errorCountSprintValue === 0
            ? UserWordStatus.EASY
            : UserWordStatus.HARD,
        optional,
      },
      wordId: word.id,
      userId: user.userId || '',
    };

    if (word?.userWord) {
      updateWord(wordRequest);
    } else {
      createUserWord(wordRequest);
    }
  };

  const handleAnswer = (textContent: string) => {
    const id = data ? data[wordIndex].id : '';
    const audio = data ? data[wordIndex].audio : '';
    const word = data ? data[wordIndex].word : '';
    const wordTranslate = data ? data[wordIndex].wordTranslate : '';
    const transcription = data ? data[wordIndex].transcription : '';

    if (
      (textContent === 'true' && arrayOfCoins[wordIndex]) ||
      (textContent === 'false' && !arrayOfCoins[wordIndex])
    ) {
      const result = true;

      if (streak === 3) {
        if (multiplier !== 4) {
          setMultiplier((prevState) => prevState + 1);
        }
        setStreak(1);
      }

      if (streak !== 3) {
        setStreak((prevState) => prevState + 1);
      }

      setScore((prevState) => prevState + 10 * multiplier);
      setCounter((prevState) => prevState + 1);
      setArrayOfCounters([...arrayOfCounters, counter]);

      if (user.token) {
        handleAccuracy(true);
      }

      handleStatistics({
        id,
        audio,
        word,
        wordTranslate,
        transcription,
        result,
      });
    } else {
      const result = false;

      if (user.token) {
        handleAccuracy(false);
      }

      handleStatistics({ id, audio, word, wordTranslate, transcription, result });

      setStreak(0);
      setMultiplier(1);
      setCounter(0);
      setArrayOfCounters([...arrayOfCounters, counter]);
    }
  };

  const handleMaxStreak = () => {
    if (counter >= maxStreak) {
      setMaxStreak(Math.max.apply(null, arrayOfCounters));
    }
  };

  const handleButtonSelect = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const textContent = target.textContent as string;
    handleAnswer(textContent);
    handleWordIndex();
  };

  const handleKeySelect = (event: KeyboardEvent) => {
    const { code } = event;

    if (code === 'KeyY') {
      handleAnswer('true');
      handleWordIndex();
    }

    if (code === 'KeyN') {
      handleAnswer('false');
      handleWordIndex();
    }
  };

  useEffect(() => {
    getEnglishWord();
    getRandomWordTranslation();
    handleTimeStartGame();

    document.addEventListener('keydown', handleKeySelect);
    return () => {
      document.removeEventListener('keydown', handleKeySelect);
    };
  }, []);

  useEffect(() => {
    handleMaxStreak();
    console.log('maxStreak', maxStreak);
  }, [counter]);

  useEffect(() => {
    getEnglishWord();
    getRandomWordTranslation();
  }, [wordIndex]);

  useEffect(() => {
    const counterTimer = setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);

    if (!timer) {
      clearTimeout(counterTimer);

      setTimeout(() => {
        handleIsEndGame(true);
        handleTimeEndGame();
      }, 1000);
    }
  }, [timer]);

  return (
    <>
      <div className="sprint-frame">
        <div className="sprint-ui">
          <Circle title="Time:" value={timer} />
          <Circle title="Level" value={`№${group + 1}`} />
          <div className="sprint-ui__streak-wrapper user-select_none">
            <ul className="sprint-ui__streak">
              <Multiplier multiplier={streak} value={0} description="&#128293;" />
              <Multiplier multiplier={streak} value={1} description="&#128293;" />
              <Multiplier multiplier={streak} value={2} description="&#128293;" />
            </ul>
            <ul className="sprint-ui__level">
              <Multiplier multiplier={multiplier} value={0} description="x1" />
              <Multiplier multiplier={multiplier} value={1} description="x2" />
              <Multiplier multiplier={multiplier} value={2} description="x3" />
              <Multiplier multiplier={multiplier} value={3} description="x4" />
            </ul>
          </div>
          <Circle title="Score:" value={score} />
        </div>
        <h2 className="sprint-frame__header">{englishWord}</h2>
        <h2 className="sprint-frame__header">
          {arrayOfCoins[wordIndex] ? englishWordTranslation : randomWordTranslation}
        </h2>
        <ButtonSpeak audio={data ? data[wordIndex].audio : ''} />
        <div className="button-select__wrapper">
          <ButtonSelect description="false" bgColor="bg_red" onClick={handleButtonSelect} />
          <ButtonSelect description="true" bgColor="bg_green" onClick={handleButtonSelect} />
        </div>
      </div>
      <nav className="button-menu">
        <ButtonReset description="Level Reset" disabled={!timer} onClick={resetGame} />
      </nav>
    </>
  );
};

export { GameAuth };
