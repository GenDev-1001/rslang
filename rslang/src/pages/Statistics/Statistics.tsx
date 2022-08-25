import { FC } from 'react';
import { Graph, Progress, Game } from './components';
import sprintBg from '../../images/sprint-greetings-bg.jpg';
import sprintIcon from '../../images/sprint.svg';
import audiocallIcon from '../../images/audiocall.svg';
import './Statistics.scss';

const Statistics: FC = () => {
  return (
    <div className="sprint-wrapper">
      <img src={sprintBg} alt="Statistics Background" className="sprint-wrapper__bg" />
      <div className="sprint-frame statistics-frame">
        <div className="statistics-wrapper">
          <div className="statistics-wrapper_first">
            <div className="words-learned__wrapper">
              <h2 className="words-learned">0</h2>
              <div className="words-learned__wrapper-descrption">
                <h2>words</h2>
                <h3>were learned</h3>
              </div>
            </div>
            <Progress progress={50} />
          </div>
          <div className="statistics-wrapper_second">
            <Game title="Sprint" src={sprintIcon} />
            <Game title="Audio Call" src={audiocallIcon} />
          </div>
        </div>
        <Graph title="Новые слова" subtitle="за каждый день изучения" />
        <Graph title="Изученные слова" subtitle="за весь период обучения" />
      </div>
    </div>
  );
};

export { Statistics };
