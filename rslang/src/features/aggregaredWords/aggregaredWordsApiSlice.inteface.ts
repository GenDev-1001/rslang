import { Omit, UserWordStatus } from '../../common/interfaces';
import { IUserWordData } from '../userWords/userWordsApiSlice.interface';

export interface IPaginatedResult {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  userWord: IUserWordData;
  word: string;
  wordTranslate: string;
  _id: string;
}

export interface ITotalCount {
  count: number;
}

export interface IAggregatedWordsData {
  paginatedResults: IPaginatedResult[];
  totalCount: [ITotalCount];
}

export interface IAggregatedWordsRequest {
  userId: string;
  group: number;
  page: number;
  difficulty: UserWordStatus;
}

export interface IPaginatedResultUpdated extends Omit<IPaginatedResult, '_id'> {
  id: string;
}
export interface IActivePaginatedResult extends Omit<IPaginatedResultUpdated, 'userWord'> {
  userWord?: IUserWordData;
}

export interface IAggregatedWordsResponse {
  paginatedResults: IPaginatedResultUpdated[];
  totalCount: number;
}

export interface IActiveWordsResponse {
  paginatedResults: IActivePaginatedResult[];
  totalCount: number;
}

export interface ICountWordsByGroup {
  userId: string;
  group: number;
}

export interface IActiveWordsByUser extends Omit<IAggregatedWordsRequest, 'difficulty'> {}
