import { useState, MouseEvent } from 'react';
import { Header } from '../../components/Header';
import { ButtonLevelList } from './components';
import sprintBg from '../../images/sprint-greetings-bg.jpg';
import './Sprint.scss';

export function Sprint() {
  const [level, setLevel] = useState<string>('');

  const handleSetLevel = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const value = target.textContent as string;
    setLevel(value);
  };

  return (
    <div className="sprint-wrapper">
      <Header />
      <img src={sprintBg} alt="Sprint Background" className="sprint-wrapper__bg" />
      {!level && (
        <div className="sprint-greetings">
          <h2 className="sprint-greetings__header">Спринт</h2>
          <p className="sprint-greetings__description">
            Тренирует <strong className="strong">навык быстрого перевода</strong> с английского
            языка на русский. Вам нужно выбрать соответствует ли перевод предложенному слову.
          </p>
          <p className="sprint-greetings__description">
            <strong className="strong">Выберите себе уровень сложности:</strong>
          </p>
          <ButtonLevelList onClick={handleSetLevel} />
        </div>
      )}
      {level && (
        <>
          <h2>{`Вы выбрали уровень №${level}`}</h2>
          <button onClick={() => setLevel('')}>Сброс уровня</button>
        </>
      )}
    </div>
  );
}
