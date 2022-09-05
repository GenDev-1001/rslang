import { IWordsResponse } from '../../../../../features/words/wordsSlice.interface';

export interface IButtonSpeak {
  audio: IWordsResponse | undefined | string;
}
