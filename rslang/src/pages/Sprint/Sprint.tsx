import { FC, useState, MouseEvent, useEffect } from 'react';
import { Loading, Greetings, Game, Statistics } from './components';
import { useGetWordsQuery } from '../../features/words/wordsApiSlice';
import sprintBg from '../../images/sprint-greetings-bg.jpg';
import './Sprint.scss';

const Sprint: FC = () => {
  const [group, setGroup] = useState<string>('');
  const [page, setPage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEndGame, setIsEndGame] = useState<boolean>(false);

  const { data } = useGetWordsQuery({
    group: +group,
    page: +page,
  });

  const handleLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleGroup = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const textContent = target.textContent as string;
    setGroup(`${+textContent - 1}`);
    handleLoading();
  };

  const handleIsEndGame = (value: boolean) => {
    setIsEndGame(value);
  };

  const endGame = () => {
    setIsEndGame(false);
  };

  const resetGroup = () => {
    endGame();
    setGroup('');
  };

  useEffect(() => {
    console.log('data ===', data);
  }, []);

  return (
    <div className="sprint-wrapper">
      <img src={sprintBg} alt="Sprint Background" className="sprint-wrapper__bg" />
      {!group && <Greetings onClick={handleGroup} />}
      {isLoading && <Loading />}
      {group && !isLoading && !isEndGame && (
        <Game data={data} group={group} resetGroup={resetGroup} handleIsEndGame={handleIsEndGame} />
      )}
      {isEndGame && <Statistics endGame={endGame} resetGroup={resetGroup} />}
    </div>
  );
};

export { Sprint };
