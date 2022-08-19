import { useState, MouseEvent } from 'react';
import { Header } from '../../components/Header';
import { ButtonLevelList } from './components';
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
        {!level && <ButtonLevelList onClick={handleSetLevel} />}
        {level && (
          <>
            <h2>{`Вы выбрали уровень №${level}`}</h2>
            <button onClick={() => setLevel('')}>Сброс уровня</button>
          </>
        )}
      </div>
    </>
  );
}
