import { FC, MouseEvent, useEffect, useState } from 'react';
import { ButtonReset, ButtonSelect, ButtonSpeak, Circle, Multiplier } from '..';
import { random } from '../../../../common/utils/random';
import { IWordsResponse } from '../../../../features/words/wordsSlice.interface';
import { IStatistics } from '../../Sprint';
import './Game.scss';

export interface IGame {
  data: IWordsResponse[] | undefined;
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

const Game: FC<IGame> = ({
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
  const [timer, setTimer] = useState<number>(20);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [englishWord, setEnglishWord] = useState<string>('');
  const [englishWordTranslation, setEnglishWordTranslation] = useState<string>('');
  const [randomWordTranslation, setRandomWordTranslation] = useState<string>('');

  const getEnglishWord = () => {
    const word = data ? data[wordIndex].word : '';
    const wordTranslate = data ? data[wordIndex].wordTranslate : '';
    setEnglishWord(word);
    setEnglishWordTranslation(wordTranslate);
  };

  const getRandomWordTranslation = () => {
    const randomNumber = random(0, 20);
    const randomWordTranlation = data ? data[randomNumber].wordTranslate : '';
    setRandomWordTranslation(randomWordTranlation);
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

  const handleAnswer = (textContent: string) => {
    const id = data ? data[wordIndex].id : '';
    const audio = data ? data[wordIndex].audio : '';
    const word = data ? data[wordIndex].word : '';
    const wordTranslate = data ? data[wordIndex].wordTranslate : '';
    const transcription = data ? data[wordIndex].transcription : '';

    if (
      ((textContent === 'true' || textContent === 'ArrowRight') && arrayOfCoins[wordIndex]) ||
      ((textContent === 'false' || textContent === 'ArrowLeft') && !arrayOfCoins[wordIndex])
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

      handleStatistics({ id, audio, word, wordTranslate, transcription, result });
      setStreak(0);
      setMultiplier(1);
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
    getEnglishWord();
    getRandomWordTranslation();
  }, [wordIndex]);

  useEffect(() => {
    const counter = setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);

    if (!timer) {
      clearTimeout(counter);

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

export { Game };
