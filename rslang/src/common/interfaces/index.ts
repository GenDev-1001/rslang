export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface IUser {
  name: string;
  email: string;
  password: string;
}

interface IFromLocation {
  pathname: string;
}

export interface IAuthLocationState {
  from: IFromLocation;
}

export interface LocationParams {
  pathname: string;
  state: IAuthLocationState | null;
  search: string;
  hash: string;
  key: string;
}

export const enum UserWordStatus {
  WORK = 'work',
  HARD = 'hard',
  DELETE = 'delete',
  EASY = 'easy',
}
