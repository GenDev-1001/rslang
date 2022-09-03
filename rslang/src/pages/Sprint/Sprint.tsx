import { FC, useState, MouseEvent } from 'react';
import { Loading, Greetings, Game, GameAuth, Statistics } from './components';
import { useGetWordsQuery } from '../../features/words/wordsApiSlice';
import { useActiveWordsByUserQuery } from '../../features/aggregaredWords/aggregaredWordsApiSlice';
// import { useDictionaryWordsQuery } from '../../features/aggregaredWords/aggregaredWordsApiSlice';
// import { UserWordStatus } from '../../common/interfaces';
import { useAuth } from '../../hooks/useAuth';
import { coinToss } from '../../common/utils/coinToss';
import sprintBg from '../../images/sprint-greetings-bg.jpg';
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

const localGroup = localStorage.getItem('currentGroup') || 0;
const localPage = localStorage.getItem('currentPage') || 0;

const Sprint: FC<ISprint> = ({ isGameOpenFromMenu }) => {
  const [group, setGroup] = useState<number>(!isGameOpenFromMenu ? +localGroup : 0);
  const [page, setPage] = useState<number>(!isGameOpenFromMenu ? +localPage : 0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStartGame, setIsStartGame] = useState<boolean>(true);
  const [isEndGame, setIsEndGame] = useState<boolean>(false);
  const [statistics, setStatistics] = useState<IStatistics[]>([]);

  const { user } = useAuth();

  const { data: unauthorizedWords } = useGetWordsQuery({
    group,
    page,
  });

  console.log('unauthorizedWords ===', unauthorizedWords);

  const { data: authorizedWords } = useActiveWordsByUserQuery({
    userId: user.userId || '',
    group,
    page,
  });

  console.log('authorizedWords ===', authorizedWords?.paginatedResults);

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

  return (
    <div className="sprint-wrapper">
      <img src={sprintBg} alt="Sprint Background" className="sprint-wrapper__bg" />
      {isStartGame && <Greetings onClick={handleGroup} />}
      {isLoading && <Loading />}
      {!isStartGame && !isLoading && !isEndGame && !user.token && (
        <Game
          data={unauthorizedWords}
          arrayOfCoins={arrayOfCoins}
          group={group}
          resetGame={resetGame}
          handleIsEndGame={handleIsEndGame}
          handleStatistics={handleStatistics}
        />
      )}
      {!isStartGame && !isLoading && !isEndGame && user.token && (
        <GameAuth
          data={authorizedWords?.paginatedResults}
          arrayOfCoins={arrayOfCoins}
          group={group}
          resetGame={resetGame}
          handleIsEndGame={handleIsEndGame}
          handleStatistics={handleStatistics}
        />
      )}
      {isEndGame && <Statistics statistics={statistics} endGame={endGame} resetGame={resetGame} />}
    </div>
  );
};

export { Sprint };
