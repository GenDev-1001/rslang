import { IUserWordData } from '../../features/userWords/userWordsApiSlice.interface';

export interface IStatistics {
  id: string;
  word: string;
  audio: string;
  transcription: string;
  wordTranslate: string;
  answer: boolean;
}
export interface WordsType {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: string;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
  status?: string;
  userWord?: IUserWordData;
}

export const wordsArrayFilds: WordsType = {
  audio: '',
  audioExample: '',
  audioMeaning: '',
  group: 0,
  id: '',
  image: '',
  page: 0,
  textExample: '',
  textExampleTranslate: '',
  textMeaning: '',
  textMeaningTranslate: '',
  transcription: '',
  word: '',
  wordTranslate: '',
  status: 'bg_white',
};

export const keyCodesArr: number[] = [49, 50, 51, 52, 53, 97, 98, 99, 100, 101];
