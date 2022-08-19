import { useState, useEffect, MouseEvent } from 'react';
import { ButtonSelectList, ButtonReset } from '..';

export interface IGame {
  level: string;
  onClick: () => void;
}

export function Game({ level, onClick }: IGame) {
  const [timer, setTimer] = useState<number>(5);

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

    if (timer === 0) {
      clearTimeout(counter);
    }
  }, [timer]);

  return (
    <div className="sprint-frame">
      <h2 className="sprint-frame__header">{`Вы выбрали уровень №${level}`}</h2>
      <h2 className="sprint-frame__header">{`Таймер: ${timer}`}</h2>
      <ButtonReset onClick={onClick} />
      <ButtonSelectList onClick={handleButtonSelect} />
    </div>
  );
}
