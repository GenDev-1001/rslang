import { FC, useState, MouseEvent } from 'react';
import { Loading, Greetings, Game, Statistics } from './components';
import sprintBg from '../../images/sprint-greetings-bg.jpg';
import './Sprint.scss';

const Sprint: FC = () => {
  const [level, setLevel] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEndGame, setIsEndGame] = useState<boolean>(false);

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

  const handleIsEndGame = (value: boolean) => {
    setIsEndGame(value);
  };

  const endGame = () => {
    setIsEndGame(false);
  };

  const resetLevel = () => {
    endGame();
    setLevel('');
  };

  return (
    <div className="sprint-wrapper">
      <img src={sprintBg} alt="Sprint Background" className="sprint-wrapper__bg" />
      {!level && <Greetings onClick={handleSetLevel} />}
      {isLoading && <Loading />}
      {level && !isLoading && !isEndGame && (
        <Game level={level} resetLevel={resetLevel} handleIsEndGame={handleIsEndGame} />
      )}
      {isEndGame && <Statistics endGame={endGame} resetLevel={resetLevel} />}
    </div>
  );
};

export { Sprint };
