import { FC, useState, MouseEvent } from 'react';
import { Loading, Greetings, Game, Statistics } from './components';
import { useGetWordsQuery } from '../../features/words/wordsApiSlice';
import { useAuth } from '../../hooks/useAuth';
import sprintBg from '../../images/sprint-greetings-bg.jpg';
import './Sprint.scss';

const Sprint: FC = () => {
  const [group, setGroup] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStartGame, setIsStartGame] = useState<boolean>(true);
  const [isEndGame, setIsEndGame] = useState<boolean>(false);

  const { user } = useAuth();

  const { data: unauthorizedWords } = useGetWordsQuery({
    group,
    page,
  });

  const handleLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleGroup = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const textContent = target.textContent as string;
    setGroup(+textContent - 1);
    setIsStartGame(false);
    handleLoading();
  };

  const handleIsEndGame = (value: boolean) => {
    setIsEndGame(value);
  };

  const endGame = () => {
    setIsEndGame(false);
  };

  const resetGame = () => {
    endGame();
    setIsStartGame(true);
  };

  return (
    <div className="sprint-wrapper">
      <img src={sprintBg} alt="Sprint Background" className="sprint-wrapper__bg" />
      {isStartGame && <Greetings onClick={handleGroup} />}
      {isLoading && <Loading />}
      {!isStartGame && !isLoading && !isEndGame && (
        <Game
          data={unauthorizedWords}
          group={group}
          resetGame={resetGame}
          handleIsEndGame={handleIsEndGame}
        />
      )}
      {isEndGame && <Statistics endGame={endGame} resetGame={resetGame} />}
    </div>
  );
};

export { Sprint };
