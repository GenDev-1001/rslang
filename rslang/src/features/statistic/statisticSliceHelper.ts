import { IStatistics } from '../../pages/Sprint/Sprint';
import { IStatistic } from './statisticApiSlice.interface';
import { IAnswersWords, ICurrentStatistic, IStatisticState } from './statisticSlice.interface';

const getAnswers = (words: IStatistics[]) =>
  words.reduce(
    (acc, curr) => {
      if (curr.result) {
        acc = {
          ...acc,
          wordsTrue: [...acc.wordsTrue, curr.id],
        };
      } else {
        acc = {
          ...acc,
          wordsFalse: [...acc.wordsFalse, curr.id],
        };
      }

      return acc;
    },
    {
      wordsFalse: [],
      wordsTrue: [],
    } as IAnswersWords,
  );

export const getStatistic = (
  statistics: IStatistic[],
  newStat: ICurrentStatistic,
): IStatisticState => {
  const { statisticGame, ...rest } = newStat;
  const answers = getAnswers(statisticGame);

  const allStatistics = statistics.concat({ ...rest, ...answers });
  const learnedWords = new Set(
    allStatistics.map((stat) => stat.wordsTrue.concat(stat.wordsFalse)).flat(),
  ).size;
  return { learnedWords, statistics: allStatistics };
};
