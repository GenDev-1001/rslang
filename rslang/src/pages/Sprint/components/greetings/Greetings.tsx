import { MouseEvent } from 'react';
import { ButtonLevelList } from '..';

export interface IGreetings {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function Greetings({ onClick }: IGreetings) {
  return (
    <div className="sprint-frame">
      <h2 className="sprint-frame__header">Спринт</h2>
      <p className="sprint-frame__description">
        Тренирует <strong className="strong">навык быстрого перевода</strong> с английского языка на
        русский. Вам нужно выбрать соответствует ли перевод предложенному слову.
      </p>
      <p className="sprint-frame__description">
        <strong className="strong">Выберите себе уровень сложности:</strong>
      </p>
      <ButtonLevelList onClick={onClick} />
    </div>
  );
}
