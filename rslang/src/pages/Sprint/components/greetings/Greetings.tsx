import { FC, MouseEvent } from 'react';
import { ButtonLevel } from '..';

export interface IGreetings {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Greetings: FC<IGreetings> = ({ onClick }) => {
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
      <div className="button-level__wrapper">
        <ButtonLevel description="1" bgColor="bg_green" onClick={onClick} />
        <ButtonLevel description="2" bgColor="bg_yellow" onClick={onClick} />
        <ButtonLevel description="3" bgColor="bg_orange" onClick={onClick} />
        <ButtonLevel description="4" bgColor="bg_red" onClick={onClick} />
        <ButtonLevel description="5" bgColor="bg_pink" onClick={onClick} />
        <ButtonLevel description="6" bgColor="bg_purple" onClick={onClick} />
      </div>
    </div>
  );
};

export { Greetings };
