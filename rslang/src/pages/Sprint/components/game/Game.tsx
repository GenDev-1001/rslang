import { MouseEvent } from 'react';
import { ButtonSelectList, ButtonReset } from '..';

export interface IGame {
  level: string;
  onClick: () => void;
}

export function Game({ level, onClick }: IGame) {
  const handleButtonSelect = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const textContent = target.textContent as string;
    console.log('textContent ===', textContent);
  };

  return (
    <div className="sprint-frame">
      <h2 className="sprint-frame__header">{`Вы выбрали уровень №${level}`}</h2>
      <ButtonReset onClick={onClick} />
      <ButtonSelectList onClick={handleButtonSelect} />
    </div>
  );
}
