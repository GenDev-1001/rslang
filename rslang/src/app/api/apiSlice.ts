import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { safeParse } from '../../common/utils/safeParse';
import { logOut, updateUserTokens } from '../../features/auth/authSlice';
import { IAuthPayload, ITokensPayload } from '../../features/auth/authSlice.inteface';
import { RootState } from '../store';

const BASE_URL = 'https://rs-lang-team-84.herokuapp.com/';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const user = safeParse<IAuthPayload>(localStorage.getItem('user') || 'null');

    const { token } = (getState() as RootState).auth;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    } else if (user) {
      headers.set('authorization', `Bearer ${user.token}`);
    }

    return headers;
  },
});

const getNewTokens = async (url: string, refreshToken: string): Promise<ITokensPayload | null> => {
  try {
    const rawResponse = await fetch(BASE_URL + url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!rawResponse.ok) {
      throw new Error('Error');
    }

    const content = await rawResponse.json();

    return content;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }

  return null;
};

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (
    (result.error?.status === 'PARSING_ERROR' && result.error.originalStatus === 401) ||
    result.error?.status === 404
  ) {
    const { refreshToken, userId } = (api.getState() as RootState).auth;
    const user = safeParse<IAuthPayload>(localStorage.getItem('user') || 'null');

    let refreshResult;

    if (refreshToken && userId) {
      refreshResult = await getNewTokens(`users/${userId}/tokens`, refreshToken);
    } else if (user?.refreshToken && user?.userId) {
      refreshResult = await getNewTokens(`users/${user.userId}/tokens`, user.refreshToken);
    }

    if (refreshResult) {
      const { token, refreshToken: newRefreshToken } = refreshResult;
      api.dispatch(updateUserTokens({ token, refreshToken: newRefreshToken }));

      return baseQuery(args, api, extraOptions);
    }
    api.dispatch(logOut());
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
