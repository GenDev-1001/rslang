import { IWordsResponse } from '../../../../features/words/wordsSlice.interface';
import { IStatistics } from '../../constants';

export interface IGame {
  data: IWordsResponse[] | undefined;
  group: number;
  handleGameStatistics: ({
    id,
    audio,
    word,
    wordTranslate,
    transcription,
    result,
  }: IStatistics) => void;
  resetGame: () => void;
  handleTimeStartGame: () => void;
  handleTimeEndGame: () => void;
  handleIsEndGame: (value: boolean) => void;
  handleStatistic: (streak: number, score: number, timeStop: string) => void;
}
