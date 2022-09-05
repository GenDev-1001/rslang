import { IStatistics } from '../../pages/Sprint/Sprint.interface';
import { IStatistic, StatisticGameEnum } from './statisticApiSlice.interface';

export interface IStatisticState {
  learnedWords: number;
  statistics: IStatistic[];
}

export interface ICurrentStatistic {
  name: StatisticGameEnum;
  score: number;
  timeStart: string;
  timeStop: string;
  seriesTrueAnswers: number;
  statisticGame: IStatistics[];
}

export interface IAnswersWords {
  wordsFalse: number;
  wordsTrue: number;
}
