import { FC, useState, MouseEvent } from 'react';
import { Loading, Greetings, Game, Statistics } from './components';
import { useGetWordsQuery } from '../../features/words/wordsApiSlice';
import { useAuth } from '../../hooks/useAuth';
import { random } from '../../common/utils/random';
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

const Sprint: FC<ISprint> = ({ isGameOpenFromMenu }) => {
  const [group, setGroup] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
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

  const getArrayOfCoins = () => {
    const arr = [];

    for (let i = 0; i < 20; i += 1) {
      arr.push(coinToss());
    }

    console.log('arr ===', arr);
    return arr;
  };

  const arrayOfCoins = getArrayOfCoins();

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
      {!isStartGame && !isLoading && !isEndGame && (
        <Game
          data={unauthorizedWords}
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
