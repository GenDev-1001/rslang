import { IStatistics } from '../../pages/Sprint/Sprint.interface';
import { IStatistic } from './statisticApiSlice.interface';
import { IAnswersWords, ICurrentStatistic, IStatisticState } from './statisticSlice.interface';

const getAnswers = (words: IStatistics[]) =>
  words.reduce(
    (acc, curr) => {
      if (curr.result) {
        acc = {
          ...acc,
          wordsTrue: acc.wordsTrue + 1,
        };
      } else {
        acc = {
          ...acc,
          wordsFalse: acc.wordsFalse + 1,
        };
      }

      return acc;
    },
    {
      wordsFalse: 0,
      wordsTrue: 0,
    } as IAnswersWords,
  );

export const getStatistic = (
  statistics: IStatistic[],
  newStat: ICurrentStatistic,
): IStatisticState => {
  const { statisticGame, ...rest } = newStat;
  const answers = getAnswers(statisticGame);

  const allStatistics = statistics.concat({ ...rest, ...answers });
  const learnedWords = allStatistics.reduce((acc, stat) => {
    acc += stat.wordsTrue;
    return acc;
  }, 0);
  return { learnedWords, statistics: allStatistics };
};
