import { IUser, Omit } from '../../common/interfaces';

export interface IUserData extends Omit<IUser, 'password'> {}
export interface IGetUserResponse extends IUserData {}

export interface ICreateUserRequest extends IUser {}
export interface ICreateUserResponse extends IUserData {
  id: string;
}

export interface IUpdateUserResponse extends IUserData {}
export interface IUpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  id: string;
}
