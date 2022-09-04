export const enum StatisticGameEnum {
  SPRINT = 'sprint',
  AUDIOCALL = 'audiocall',
}

export interface IStatistic {
  name: StatisticGameEnum | string;
  score: number;
  seriesTrueAnswers: number;
  timeStart: string;
  timeStop: string;
  wordsFalse: string[]; // id words
  wordsTrue: string[];
}

export interface IPersonStatistic {
  learnedWords: number;
  statistics: IStatistic[];
}

export interface IGetStatisticResponse {
  id: string;
  learnedWords: number;
  optional: {
    statistics: string;
  };
}

export interface IPutStatisticRequest {
  userId: string;
  statistic: IPersonStatistic;
}
