import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { IAuthPayload, IAuthState, ITokensPayload } from './authSlice.inteface';

const initialState: IAuthState = {
  token: null,
  refreshToken: null,
  userId: null,
  name: null,
  newAccount: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuthPayload>) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      const { name, refreshToken, token, userId } = action.payload;
      state.token = token;
      state.userId = userId;
      state.refreshToken = refreshToken;
      state.name = name;
    },
    newUser: (state, action: PayloadAction<string>) => {
      localStorage.setItem('newUser', JSON.stringify(action.payload));
      state.newAccount = true;
    },
    logOut: (state) => {
      localStorage.removeItem('user');
      localStorage.removeItem('newUser');
      localStorage.removeItem('statistic');
      return initialState;
    },
    updateUserTokens: (state, action: PayloadAction<ITokensPayload>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;

      const { newAccount, ...rest } = state;
      localStorage.setItem('user', JSON.stringify({ ...rest }));
    },
  },
});

export const { setUser, newUser, logOut, updateUserTokens } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
