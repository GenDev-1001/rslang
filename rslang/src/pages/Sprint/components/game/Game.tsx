import { FC, useState, useEffect, MouseEvent } from 'react';
import { ButtonReset, ButtonSpeak, ButtonSelect, Multiplier, Circle } from '..';
import { IWordsResponse } from '../../../../features/words/wordsSlice.interface';
import './Game.scss';

export interface IGame {
  data: IWordsResponse[] | undefined;
  group: number;
  resetGame: () => void;
  handleIsEndGame: (value: boolean) => void;
}

const Game: FC<IGame> = ({ data, group, resetGame, handleIsEndGame }) => {
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
    const min = 0;
    const max = 20;
    const random = Math.floor(Math.random() * (max - min)) + min;
    const randomWordTranlation = data ? data[random].wordTranslate : '';
    setRandomWordTranslation(randomWordTranlation);
  };

  const handleWordIndex = () => {
    if (wordIndex < 19) {
      setWordIndex(wordIndex + 1);
    } else {
      handleIsEndGame(true);
    }
  };

  const handleAnswer = (textContent: string) => {
    if (
      (textContent === 'true' && englishWordTranslation === randomWordTranslation) ||
      (textContent === 'false' && englishWordTranslation !== randomWordTranslation)
    ) {
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
    } else {
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

  const handleKeySelect = (event: globalThis.KeyboardEvent) => {
    const { code } = event;

    switch (code) {
      case 'ArrowRight':
        handleAnswer('ArrowRight');
        break;
      case 'ArrowLeft':
        handleAnswer('ArrowLeft');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getEnglishWord();
    getRandomWordTranslation();

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
        <h2 className="sprint-frame__header">{randomWordTranslation}</h2>
        <ButtonSpeak data={data ? data[wordIndex] : undefined} />
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
