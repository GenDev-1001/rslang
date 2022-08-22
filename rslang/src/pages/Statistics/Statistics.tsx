import { FC } from 'react';
import { Graph } from './components';
import sprintBg from '../../images/sprint-greetings-bg.jpg';
import './Statistics.scss';

const Statistics: FC = () => {
  return (
    <div className="sprint-wrapper">
      <img src={sprintBg} alt="Statistics Background" className="sprint-wrapper__bg" />
      <div className="sprint-frame statistics-frame">
        <Graph title="Новые слова" subtitle="за каждый день изучения" />
        <Graph title="Изученные слова" subtitle="за весь период обучения" />
      </div>
    </div>
  );
};

export { Statistics };
