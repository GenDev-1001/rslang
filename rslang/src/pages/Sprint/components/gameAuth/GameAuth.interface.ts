import { IActivePaginatedResult } from '../../../../features/aggregaredWords/aggregaredWordsApiSlice.inteface';
import { IStatistics } from '../../Sprint.interface';

export interface IGameAuth {
  data: IActivePaginatedResult[] | undefined;
  arrayOfCoins: boolean[];
  page: number;
  group: number;
  resetGame: () => void;
  handleIsEndGame: (value: boolean) => void;
  handleStatistics: ({
    id,
    audio,
    word,
    wordTranslate,
    transcription,
    result,
  }: IStatistics) => void;
  handlePage: () => void;
  handleTimeStartGame: () => void;
  handleTimeEndGame: () => void;
  handleGameStatistic: (streak: number, score: number) => void;
}
