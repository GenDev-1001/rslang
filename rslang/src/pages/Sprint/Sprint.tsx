import { FC, useState, MouseEvent } from 'react';
import { Loading, Greetings, Game, GameAuth, Statistics } from './components';
import { useGetWordsQuery } from '../../features/words/wordsApiSlice';
import { useActiveWordsByUserQuery } from '../../features/aggregaredWords/aggregaredWordsApiSlice';
import { useAuth } from '../../hooks/useAuth';
import { coinToss } from '../../common/utils/coinToss';
import sprintBg from '../../images/sprint-greetings-bg.jpg';
import './Sprint.scss';
import { random } from '../../common/utils/random';

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

const localGroup = localStorage.getItem('currentGroup') || 0;
const localPage = localStorage.getItem('currentPage') || 0;

const Sprint: FC<ISprint> = ({ isGameOpenFromMenu }) => {
  const [group, setGroup] = useState<number>(!isGameOpenFromMenu ? +localGroup : 0);
  const [page, setPage] = useState<number>(!isGameOpenFromMenu ? +localPage : random(0, 29));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStartGame, setIsStartGame] = useState<boolean>(true);
  const [isEndGame, setIsEndGame] = useState<boolean>(false);
  const [statistics, setStatistics] = useState<IStatistics[]>([]);
  const [timeStartGame, setTimeStartGame] = useState<string>('');
  const [timeEndGame, setTimeEndGame] = useState<string>('');

  const { user } = useAuth();

  const { data: unauthorizedWords } = useGetWordsQuery({
    group,
    page,
  });

  const { data: authorizedWords } = useActiveWordsByUserQuery({
    userId: user.userId || '',
    group,
    page,
  });

  const getArrayOfCoins = (value: number) => {
    const arr = [];

    for (let i = 0; i < value; i += 1) {
      arr.push(coinToss());
    }

    return arr;
  };

  const arrayOfCoins = getArrayOfCoins(20);

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

  const handlePage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleTimeStartGame = () => {
    setTimeStartGame(new Date().toISOString());
  };

  const handleTimeEndGame = () => {
    setTimeEndGame(new Date().toISOString());
  };

  return (
    <div className="sprint-wrapper">
      <img src={sprintBg} alt="Sprint Background" className="sprint-wrapper__bg" />
      {isStartGame && <Greetings onClick={handleGroup} />}
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
