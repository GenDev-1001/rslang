export const enum StatisticGameEnum {
  SPRINT = 'string',
  AUDIOCALL = 'audiocall',
}

export interface IStatistic {
  experience: number;
  name: StatisticGameEnum;
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
