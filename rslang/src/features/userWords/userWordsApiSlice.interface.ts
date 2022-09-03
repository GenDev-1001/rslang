import { UserWordStatus } from '../../common/interfaces';

export interface IUserWordOptional {
  correctCountSprint: number;
  errorCountSprint: number;
  correctCountAudio: number;
  errorCountAudio: number;
}

export interface IUserWordData {
  difficulty?: UserWordStatus;
  optional: IUserWordOptional;
}

export interface IUserWordResponse extends IUserWordData {
  id: string;
  wordId: string;
}

export interface IUserWordRequest {
  userId: string;
  wordId: string;
}

export interface ICreateUserWordRequest extends IUserWordRequest {
  word: IUserWordData;
}

export interface IUpdateUserWordRequest extends IUserWordRequest {
  word: Partial<IUserWordData>;
}
