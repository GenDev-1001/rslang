import { IUserWordData } from '../userWords/userWordsApiSlice.interface';

export interface IWordsResponse {
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
  userWord?: IUserWordData;
}

export interface IWordsRequest {
  page: number | undefined;
  group: number | undefined;
}
