import { IActivePaginatedResult } from '../../../../features/aggregaredWords/aggregaredWordsApiSlice.inteface';
import { IStatistics } from '../../constants';

export interface IGameAuth {
  data: IActivePaginatedResult[] | undefined;
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
  handleIsEndGame: (value: boolean) => void;
  handleTimeStartGame: () => void;
  handleTimeEndGame: () => void;
  handleStatistic: (streak: number, score: number, timeStop: string) => void;
}
