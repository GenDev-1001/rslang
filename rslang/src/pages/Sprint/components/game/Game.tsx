import { useState, useEffect, MouseEvent } from 'react';
import { ButtonSelectList, ButtonReset, ButtonSpeak } from '..';
import './Game.scss';

export interface IGame {
  level: string;
  resetLevel: () => void;
  handleIsEndGame: (value: boolean) => void;
}

export function Game({ level, resetLevel, handleIsEndGame }: IGame) {
  const [timer, setTimer] = useState<number>(20);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);

  const handleAnswer = (value: string) => {
    if (value === 'true' || value === 'ArrowRight') {
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
    }

    if (value === 'false') {
      setStreak(0);
      setMultiplier(1);
    }

    console.log('streak ===', streak);
    console.log('multiplier ===', multiplier);
  };

  const handleButtonSelect = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const textContent = target.textContent as string;
    handleAnswer(textContent);
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
    document.addEventListener('keydown', handleKeySelect);
    return () => {
      document.removeEventListener('keydown', handleKeySelect);
    };
  }, []);

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
            {`№${level}`}
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
        <h2 className="sprint-frame__header">English</h2>
        <h2 className="sprint-frame__header">Русский</h2>
        <ButtonSpeak />
        <ButtonSelectList onClick={handleButtonSelect} />
      </div>
      <nav className="button-menu">
        <ButtonReset description="Level Reset" disabled={!timer} onClick={resetLevel} />
      </nav>
    </>
  );
}
