import { FC } from 'react';
import { ButtonLevel } from '..';
import { IGreetings } from './Greetings.interface';

const Greetings: FC<IGreetings> = ({ onClick, isGameOpenFromMenu }) => {
  return (
    <div className="sprint-frame">
      <h2 className="sprint-frame__header">Спринт</h2>
      <p className="sprint-frame__description">
        Тренирует <strong className="strong">навык быстрого перевода</strong> с английского языка на
        русский. Вам нужно выбрать соответствует ли перевод предложенному слову.
      </p>
      <p className="sprint-frame__description">
        При помощи клавиш <strong className="strong">Y</strong> и{' '}
        <strong className="strong">N</strong> вы также можете управлять ответами соответственно для{' '}
        <strong className="strong">True</strong> и <strong className="strong">False</strong>
      </p>
      {isGameOpenFromMenu ? (
        <>
          {' '}
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
        </>
      ) : (
        <ButtonLevel description="Start" bgColor="button-start bg_green" onClick={onClick} />
      )}
    </div>
  );
};

export { Greetings };
