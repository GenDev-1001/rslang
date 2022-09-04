import { FC, MouseEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { coinToss } from '../../common/utils/coinToss';
import { useActiveWordsByUserQuery } from '../../features/aggregaredWords/aggregaredWordsApiSlice';
import { selectSettings, setGroup, setPage } from '../../features/settings/settingsSlice';
import { useGetWordsQuery } from '../../features/words/wordsApiSlice';
import { useAuth } from '../../hooks/useAuth';
import sprintBg from '../../images/sprint-greetings-bg.jpg';
import { Game, GameAuth, Greetings, Loading, Statistics } from './components';
import './Sprint.scss';

export interface IStatistics {
  id: string;
  word: string;
  audio: string;
  transcription: string;
  wordTranslate: string;
  result: boolean;
}

export interface ISprint {
  isGameOpenFromMenu: boolean;
}

const Sprint: FC<ISprint> = ({ isGameOpenFromMenu }) => {
  const { page, group } = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStartGame, setIsStartGame] = useState<boolean>(true);
  const [isEndGame, setIsEndGame] = useState<boolean>(false);
  const [statistics, setStatistics] = useState<IStatistics[]>([]);
  const [timeStartGame, setTimeStartGame] = useState<string>('');
  const [timeEndGame, setTimeEndGame] = useState<string>('');
  const [arrayOfCoins, setArrayOfCoins] = useState<boolean[]>([]);

  const { user } = useAuth();

  const { data: unauthorizedWords } = useGetWordsQuery({
    group,
    page: page - 1,
  });

  const { data: authorizedWords } = useActiveWordsByUserQuery({
    userId: user.userId || '',
    group,
    page: page - 1,
  });

  const getArrayOfCoins = (value: number) => {
    const arr = [];

    for (let i = 0; i < value; i += 1) {
      arr.push(coinToss());
    }

    setArrayOfCoins(arr);
  };

  const handleStatistics = ({
    id,
    audio,
    word,
    wordTranslate,
    transcription,
    result,
  }: IStatistics) => {
    setStatistics([...statistics, { id, audio, word, wordTranslate, transcription, result }]);
  };

  const handleLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleGroup = (event: MouseEvent<HTMLButtonElement>) => {
    if (isGameOpenFromMenu) {
      const target = event.target as HTMLButtonElement;
      const textContent = target.textContent as string;
      dispatch(setGroup(+textContent - 1));
    } else {
      dispatch(setGroup(group));
    }

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

  const handlePage = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
    } else {
      dispatch(setPage(30));
    }
  };

  const handleTimeStartGame = () => {
    setTimeStartGame(new Date().toISOString());
  };

  const handleTimeEndGame = () => {
    setTimeEndGame(new Date().toISOString());
  };

  useEffect(() => {
    getArrayOfCoins(200);
  }, []);

  return (
    <div className="sprint-wrapper">
      <img src={sprintBg} alt="Sprint Background" className="sprint-wrapper__bg" />
      {isStartGame && <Greetings onClick={handleGroup} isGameOpenFromMenu={isGameOpenFromMenu} />}
      {isLoading && <Loading />}
      {!isStartGame && !isLoading && !isEndGame && !user.token && (
        <Game
          data={unauthorizedWords}
          arrayOfCoins={arrayOfCoins}
          page={page}
          group={group}
          resetGame={resetGame}
          handleIsEndGame={handleIsEndGame}
          handleStatistics={handleStatistics}
          handlePage={handlePage}
          handleTimeStartGame={handleTimeStartGame}
          handleTimeEndGame={handleTimeEndGame}
        />
      )}
      {!isStartGame && !isLoading && !isEndGame && user.token && (
        <GameAuth
          data={authorizedWords?.paginatedResults}
          arrayOfCoins={arrayOfCoins}
          page={page}
          group={group}
          resetGame={resetGame}
          handleIsEndGame={handleIsEndGame}
          handleStatistics={handleStatistics}
          handlePage={handlePage}
          handleTimeStartGame={handleTimeStartGame}
          handleTimeEndGame={handleTimeEndGame}
        />
      )}
      {isEndGame && <Statistics statistics={statistics} endGame={endGame} resetGame={resetGame} />}
    </div>
  );
};

export { Sprint };
