import { useState, useEffect, MouseEvent } from 'react';
import { ButtonSelectList, ButtonReset } from '..';
import cat from '../../../../images/cat-speak.svg';
import './Game.scss';

export interface IGame {
  level: string;
  resetLevel: () => void;
  handleIsEndGame: (value: boolean) => void;
}

export function Game({ level, resetLevel, handleIsEndGame }: IGame) {
  const [timer, setTimer] = useState<number>(3);
  const [score, setScore] = useState<number>(10);

  const handleButtonSelect = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const textContent = target.textContent as string;
    console.log('textContent ===', textContent);
  };

  const handleKeySelect = (event: globalThis.KeyboardEvent) => {
    const { code } = event;

    switch (code) {
      case 'ArrowRight':
        console.log('code ===', code);
        break;
      case 'ArrowLeft':
        console.log('code ===', code);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeySelect);
    return () => {
      document.removeEventListener('keypress', handleKeySelect);
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
        <h2 className="sprint-frame__header user-select_none">{`Уровень №${level}`}</h2>
        <div className="sprint-ui">
          <div className="sprint-ui__circle user-select_none">
            Time:
            <br />
            {timer}
          </div>
          <div className="sprint-ui__streak-wrapper user-select_none">
            <ul className="sprint-ui__streak">
              <li className="sprint-ui__circle sprint-ui__circle_small">&#128293;</li>
              <li className="sprint-ui__circle sprint-ui__circle_small">&#128293;</li>
              <li className="sprint-ui__circle sprint-ui__circle_small">&#128293;</li>
            </ul>
            <ul className="sprint-ui__level">
              <li className="sprint-ui__circle sprint-ui__circle_small">x1</li>
              <li className="sprint-ui__circle sprint-ui__circle_small">x2</li>
              <li className="sprint-ui__circle sprint-ui__circle_small">x3</li>
              <li className="sprint-ui__circle sprint-ui__circle_small">x4</li>
            </ul>
          </div>
          <div className="sprint-ui__circle user-select_none">
            Score:
            <br />
            {score}
          </div>
        </div>
        <button className="sprint-ui__circle sprint-ui__circle_small button-cat-speak">
          <img src={cat} alt="cat" className="button-cat-speak__img" />
        </button>
        <ButtonSelectList onClick={handleButtonSelect} />
      </div>
      <nav className="button-menu">
        <ButtonReset description="Level Reset" disabled={!timer} onClick={resetLevel} />
      </nav>
    </>
  );
}
