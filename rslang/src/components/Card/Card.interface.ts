import { IActivePaginatedResult } from '../../features/aggregaredWords/aggregaredWordsApiSlice.inteface';

export interface IWordCardProps {
  word: IActivePaginatedResult;
  activeColor: number;
  wordPlaying: null | string;
  playWordCard: (value: string | null) => void;
  isDictionary: boolean;
}
