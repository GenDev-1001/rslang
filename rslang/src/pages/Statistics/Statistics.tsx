import { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useGetStatisticQuery } from '../../features/statistic/statisticApiSlice';
import { IStatistic } from '../../features/statistic/statisticApiSlice.interface';
import { selectStatistic } from '../../features/statistic/statisticSlice';
import { useAuth } from '../../hooks/useAuth';
import audiocallIcon from '../../images/audiocall.svg';
import sprintBg from '../../images/sprint-greetings-bg.jpg';
import sprintIcon from '../../images/sprint.svg';
import { Game, Graph, Progress } from './components';
import './Statistics.scss';

const Statistics: FC = () => {
  const { user } = useAuth();
  const { isLoading } = useGetStatisticQuery(user.userId || '');
  const { statistics, learnedWords } = useAppSelector(selectStatistic);

  const percentTrueWords = (games: IStatistic[]): number => {
    let wordsTrue = 0;
    let wordsFalse = 0;
    games.forEach((game) => {
      wordsTrue += game.wordsTrue;
      wordsFalse += game.wordsFalse;
    });
    return Math.round((wordsTrue * 100) / (wordsTrue + wordsFalse)) || 0;
  };

  return (
    <div className="sprint-wrapper">
      <img src={sprintBg} alt="Statistics Background" className="sprint-wrapper__bg" />
      <div className="sprint-frame statistics-frame">
        <div className="statistics-wrapper">
          <div className="statistics-wrapper_first">
            <div className="words-learned__wrapper">
              <h2 className="words-learned">{learnedWords}</h2>
              <div className="words-learned__wrapper-descrption">
                <h2>words</h2>
                <h3>were learned</h3>
              </div>
            </div>

            <Progress progress={percentTrueWords(statistics)} />
          </div>
          <div className="statistics-wrapper_second">
            <Game title="Sprint" src={sprintIcon} statistics={statistics} />
            <Game title="Audio Call" src={audiocallIcon} statistics={statistics} />
          </div>
        </div>
        <Graph title="Новые слова" subtitle="за каждый день изучения" data={statistics} />
        <Graph title="Изученные слова" subtitle="за весь период обучения" data={statistics} />
      </div>
    </div>
  );
};

export { Statistics };
