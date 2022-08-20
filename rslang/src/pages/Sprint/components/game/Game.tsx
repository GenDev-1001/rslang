import { useState, useEffect, MouseEvent } from 'react';
import { ButtonSelectList, ButtonReset } from '..';

export interface IGame {
  level: string;
  onClick: () => void;
  handleIsEndGame: (value: boolean) => void;
}

export function Game({ level, onClick, handleIsEndGame }: IGame) {
  const [timer, setTimer] = useState<number>(3);

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
        <h2 className="sprint-frame__header">{`Вы выбрали уровень №${level}`}</h2>
        <h2 className="sprint-frame__header">{`Таймер: ${timer}`}</h2>
        <ButtonSelectList onClick={handleButtonSelect} />
      </div>
      <nav className="button-menu">
        <ButtonReset description="Level Reset" disabled={!timer} onClick={onClick} />
      </nav>
    </>
  );
}
