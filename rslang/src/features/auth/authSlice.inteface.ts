import { IUser, Omit } from '../../common/interfaces';

type StringOrNull = string | null;

export interface IAuthState {
  token: StringOrNull;
  refreshToken: StringOrNull;
  userId: StringOrNull;
  name: StringOrNull;
  newAccount: Boolean;
}

export interface ISignInRequest extends Omit<IUser, 'name'> {}

export interface ISighInResponse {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface ITokensPayload {
  refreshToken: string;
  token: string;
}

export interface IAuthPayload extends Omit<ISighInResponse, 'message'> {}
