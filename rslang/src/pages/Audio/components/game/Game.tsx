import { FC, useState, useEffect, MouseEvent } from 'react';
import { ButtonReset, ButtonSpeak, ButtonSelect } from '../buttons';
import { IWordsResponse } from '../../../../features/words/wordsSlice.interface';
import { Circle } from '../circle/Circle';
import { Multiplier } from '../multiplier/Multiplier';

export interface IGame {
  data: IWordsResponse[] | undefined;
  group: string;
  resetGroup: () => void;
  handleIsEndGame: (value: boolean) => void;
}

export const Game: FC<IGame> = ({ data, group, resetGroup, handleIsEndGame }) => {
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [englishWord, setEnglishWord] = useState<string>('');
  const [englishWordTranslation, setEnglishWordTranslation] = useState<string>('');
  const [randomWordTranslation, setRandomWordTranslation] = useState<string>('');

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

  return (
    <div className="audio-frame">
      <div className="audio-ui">
        <Circle title="Level" value={`№${group}`} />
        <div className="audio-ui__streak-wrapper">
          <ul className="audio-ui__streak">
            <Multiplier multiplier={streak} value={0} description="&#128293;" />
            <Multiplier multiplier={streak} value={1} description="&#128293;" />
            <Multiplier multiplier={streak} value={2} description="&#128293;" />
          </ul>
          <ul className="audio-ui__level">
            <Multiplier multiplier={multiplier} value={0} description="x1" />
            <Multiplier multiplier={multiplier} value={1} description="x2" />
            <Multiplier multiplier={multiplier} value={2} description="x3" />
            <Multiplier multiplier={multiplier} value={3} description="x4" />
          </ul>
        </div>
        <Circle title="Score:" value={score} />
      </div>
      <ButtonSpeak data={data ? data[wordIndex] : undefined} />
      <div className="audio-btn-select__wrapper">
        <ButtonSelect description="word1" bgColor="bg_white" onClick={handleButtonSelect} />
        <ButtonSelect description="word2" bgColor="bg_white" onClick={handleButtonSelect} />
        <ButtonSelect description="word3" bgColor="bg_white" onClick={handleButtonSelect} />
        <ButtonSelect description="word4" bgColor="bg_white" onClick={handleButtonSelect} />
        <ButtonSelect description="word5" bgColor="bg_white" onClick={handleButtonSelect} />
      </div>
      <ButtonSelect description="не знаю" bgColor="bg_red" onClick={handleButtonSelect} />
      <nav className="button-menu">
        <ButtonReset description="Level Reset" onClick={resetGroup} />
      </nav>
    </div>
  );
};
