import { FC } from 'react';
import { ButtonLevel } from './buttons';
import { IGreetings } from './AudioGreetings.interface';

const AudioGreetings: FC<IGreetings> = ({ onClick, isGameOpenFromMenu }) => {
  return (
    <div className="audio-frame">
      <h2 className="audio-frame__header">Аудиовызов</h2>
      <div className="audio-frame__description">
        «Аудиовызов» - это тренировка, которая улучшает{' '}
        <strong className="strong">восприятие речи на слух</strong>.{' '}
        <ul className="options-list">
          <li className="list-item">Используйте мышь, чтобы выбрать правильный ответ</li>
          <li className="list-item">Используйте цифровые клавиши от 1 до 5 для выбора ответа</li>
          <li className="list-item">Используйте пробел для повтроного звучания слова</li>
          <li className="list-item">
            Используйте клавишу Enter для подсказки или для перехода к следующему слову
          </li>
        </ul>
      </div>
      {isGameOpenFromMenu ? (
        <>
          <p className="audio-frame__description">
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
        <ButtonLevel description="Start" bgColor="bg_purple button-start" onClick={onClick} />
      )}
    </div>
  );
};

export { AudioGreetings };
