import { useState, MouseEvent } from 'react';
import { Header } from '../../components/Header';
import { Loading, Greetings, Game } from './components';
import sprintBg from '../../images/sprint-greetings-bg.jpg';
import './Sprint.scss';

export function Sprint() {
  const [level, setLevel] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleSetLevel = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const textContent = target.textContent as string;
    setLevel(textContent);
    handleLoading();
  };

  const resetLevel = () => {
    setLevel('');
  };

  return (
    <div className="sprint-wrapper">
      <Header />
      <img src={sprintBg} alt="Sprint Background" className="sprint-wrapper__bg" />
      {!level && <Greetings onClick={handleSetLevel} />}
      {isLoading && <Loading />}
      {level && !isLoading && <Game level={level} onClick={resetLevel} />}
    </div>
  );
}
