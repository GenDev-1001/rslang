import { IStatistic } from './statisticApiSlice.interface';

export interface IStatisticState {
  learnedWords: number;
  statistics: IStatistic[];
}
