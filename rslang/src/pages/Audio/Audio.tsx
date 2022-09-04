import { FC, useState, MouseEvent, useEffect } from 'react';
import background from '../../images/sprint-greetings-bg.jpg';
import { Game } from './components/game/Game';
import './Audio.scss';
import AudioGreetings from './components/AudioGreetings';
import { useGetWordsQuery } from '../../features/words/wordsApiSlice';
import { Loading } from './components/loading/Loading';
import { Statistics } from './components/AudioStatistics/AudioStatistics';

export const Audio: FC = () => {
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
    setTimeout(() => setIsLoading(false), 2500);
  };

  const handleGroup = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const textContent = target.textContent as string;
    setGroup(`${+textContent}`);
    handleLoading();
  };

  const handleIsEndGame = (value: boolean) => {
    setIsEndGame(value);
  };

  const endGame = (): void => {
    setIsEndGame(false);
  };

  const resetGroup = (): void => {
    endGame();
    setGroup('');
  };
  // useEffect(() => {
  //   console.log('data ===', data);
  // }, []);

  return (
    <div className="audio-wrapper">
      <img src={background} alt="Audio Background" className="audio-wrapper__bg" />
      {!group && <AudioGreetings onClick={handleGroup} />}
      {isLoading && <Loading />}
      {group && !isLoading && !isEndGame && (
        <Game data={data} group={group} resetGroup={resetGroup} handleIsEndGame={handleIsEndGame} />
      )}
      {isEndGame && <Statistics endGame={endGame} resetGroup={resetGroup} />}
    </div>
  );
};
