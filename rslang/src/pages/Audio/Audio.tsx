import { FC, MouseEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useActiveWordsByUserQuery } from '../../features/aggregaredWords/aggregaredWordsApiSlice';
import { selectSettings, setGroup } from '../../features/settings/settingsSlice';
import { useGetWordsQuery } from '../../features/words/wordsApiSlice';
import { useAuth } from '../../hooks/useAuth';
import background from '../../images/sprint-greetings-bg.jpg';
import './Audio.scss';
import AudioGreetings from './components/AudioGreetings';
import { AudioStatistics } from './components/AudioStatistics/AudioStatistics';
import { Game } from './components/game/Game';
import { Loading } from './components/loading/Loading';
import { IStatistics } from './constants';

export interface IPropsAudio {
  isGameOpenFromMenu: boolean;
}

export const Audio: FC<IPropsAudio> = ({ isGameOpenFromMenu }) => {
  const { page, group } = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEndGame, setIsEndGame] = useState<boolean>(false);
  const [statistics, setStatistics] = useState<IStatistics[]>([]);
  const [isStartGame, setIsStartGame] = useState<boolean>(true);

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

  const handleLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2500);
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

  const endGame = (): void => {
    setIsEndGame(false);
  };

  const resetGame = (): void => {
    endGame();
    setIsStartGame(true);
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

  return (
    <div className="audio-wrapper">
      <img src={background} alt="Audio Background" className="audio-wrapper__bg" />
      {isStartGame && (
        <AudioGreetings onClick={handleGroup} isGameOpenFromMenu={isGameOpenFromMenu} />
      )}
      {isLoading && <Loading />}
      {!isStartGame && !isLoading && !isEndGame && (
        <Game
          data={unauthorizedWords}
          group={group}
          resetGame={resetGame}
          handleIsEndGame={handleIsEndGame}
          handleStatistics={handleStatistics}
        />
      )}

      {isEndGame && (
        <AudioStatistics statistics={statistics} endGame={endGame} resetGame={resetGame} />
      )}
    </div>
  );
};
