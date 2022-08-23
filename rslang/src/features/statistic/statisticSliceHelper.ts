import { IStatistic } from './statisticApiSlice.interface';
import { IStatisticState } from './statisticSlice.interface';

export const getStatistic = (statistics: IStatistic[], newStat: IStatistic): IStatisticState => {
  const allStatistics = statistics.concat(newStat);
  const learnedWords = new Set(
    allStatistics.map((stat) => stat.wordsTrue.concat(stat.wordsFalse)).flat(),
  ).size;
  return { learnedWords, statistics: allStatistics };
};
