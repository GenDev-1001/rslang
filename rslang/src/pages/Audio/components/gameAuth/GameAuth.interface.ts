import { WordsType, IStatistics } from '../../constants';

export interface IGameAuth {
  data: WordsType[] | undefined;
  group: number;
  handleStatistics: ({
    id,
    audio,
    word,
    wordTranslate,
    transcription,
    result,
  }: IStatistics) => void;
  resetGame: () => void;
  handleIsEndGame: (value: boolean) => void;
}
