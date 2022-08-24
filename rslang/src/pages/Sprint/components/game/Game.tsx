import { FC, useState, useEffect, MouseEvent } from 'react';
import { ButtonReset, ButtonSpeak, ButtonSelect } from '..';
import { IWordsResponse } from '../../../../features/words/wordsSlice.interface';
import './Game.scss';

// @ts-ignore
// import audioTrue from '../../../../audio/success.mp3';
// @ts-ignore
// import audioFalse from '../../../../audio/error.mp3';

export interface IGame {
  data: IWordsResponse[] | undefined;
  group: string;
  resetGroup: () => void;
  handleIsEndGame: (value: boolean) => void;
}

const Game: FC<IGame> = ({ data, group, resetGroup, handleIsEndGame }) => {
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

  // const handleAudio = (result: boolean) => {
  //   if (result) {
  //     const audio = new Audio(audioTrue);
  //     audio.play();
  //   } else {
  //     const audio = new Audio(audioFalse);
  //     audio.play();
  //   }
  // };

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

      // handleAudio(true);
      setScore((prevState) => prevState + 10 * multiplier);
    } else {
      // handleAudio(false);
      setStreak(0);
      setMultiplier(1);
    }

    console.log(englishWordTranslation === randomWordTranslation);
    console.log('streak ===', streak);
    console.log('multiplier ===', multiplier);
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
          <div className="sprint-ui__circle user-select_none">
            Time:
            <br />
            {timer}
          </div>
          <div className="sprint-ui__circle user-select_none">
            Level
            <br />
            {`№${group}`}
          </div>
          <div className="sprint-ui__streak-wrapper user-select_none">
            <ul className="sprint-ui__streak">
              <li className="sprint-ui__circle sprint-ui__circle_small">
                <span className={`opacity_zero ${streak > 0 ? 'opacity_one' : ''}`}>&#128293;</span>
              </li>
              <li className="sprint-ui__circle sprint-ui__circle_small">
                <span className={`opacity_zero ${streak > 1 ? 'opacity_one' : ''}`}>&#128293;</span>
              </li>
              <li className="sprint-ui__circle sprint-ui__circle_small">
                <span className={`opacity_zero ${streak > 2 ? 'opacity_one' : ''}`}>&#128293;</span>
              </li>
            </ul>
            <ul className="sprint-ui__level">
              <li className="sprint-ui__circle sprint-ui__circle_small">
                <span className={`opacity_zero ${multiplier > 0 ? 'opacity_one' : ''}`}>x1</span>
              </li>
              <li className="sprint-ui__circle sprint-ui__circle_small">
                <span className={`opacity_zero ${multiplier > 1 ? 'opacity_one' : ''}`}>x2</span>
              </li>
              <li className="sprint-ui__circle sprint-ui__circle_small">
                <span className={`opacity_zero ${multiplier > 2 ? 'opacity_one' : ''}`}>x3</span>
              </li>
              <li className="sprint-ui__circle sprint-ui__circle_small">
                <span className={`opacity_zero ${multiplier > 3 ? 'opacity_one' : ''}`}>x4</span>
              </li>
            </ul>
          </div>
          <div className="sprint-ui__circle user-select_none">
            Score:
            <br />
            {score}
          </div>
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
        <ButtonReset description="Level Reset" disabled={!timer} onClick={resetGroup} />
      </nav>
    </>
  );
};

export { Game };
