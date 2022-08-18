import { useState, MouseEvent } from 'react';
import { Header } from '../../components/Header';
import './Sprint.scss';

export function Sprint() {
  const [level, setLevel] = useState<string>('');

  const handleSetLevel = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const value = target.textContent as string;
    setLevel(value);
  };

  return (
    <>
      <Header />
      <div className="container">
        {!level && (
          <div className="button-level__wrapper">
            <button className="button-level" onClick={handleSetLevel}>
              1
            </button>
            <button className="button-level" onClick={handleSetLevel}>
              2
            </button>
            <button className="button-level" onClick={handleSetLevel}>
              3
            </button>
            <button className="button-level" onClick={handleSetLevel}>
              4
            </button>
            <button className="button-level" onClick={handleSetLevel}>
              5
            </button>
            <button className="button-level" onClick={handleSetLevel}>
              6
            </button>
          </div>
        )}
        {level && <h2>{`Вы выбрали уровень №${level}`}</h2>}
      </div>
    </>
  );
}
