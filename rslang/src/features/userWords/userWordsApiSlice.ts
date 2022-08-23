import { apiSlice } from '../../app/api/apiSlice';
import {
  ICreateUserWordRequest,
  IUpdateUserWordRequest,
  IUserWordRequest,
  IUserWordResponse,
} from './userWordsApiSlice.interface';

const userWordsApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['Words'] }).injectEndpoints({
  endpoints: (builder) => ({
    getUserWords: builder.query<IUserWordResponse[], string>({
      query: (id) => `/users/${id}/words`,
      providesTags: (result) =>
        result
          ? [
              { type: 'Words', id: 'LIST' },
              ...result.map(({ wordId }) => ({ type: 'Words' as const, id: wordId })),
            ]
          : [{ type: 'Words', id: 'LIST' }],
    }),
    createUserWord: builder.mutation<IUserWordResponse, ICreateUserWordRequest>({
      query: ({ userId, wordId, word }) => ({
        url: `/users/${userId}/words/${wordId}`,
        method: 'POST',
        body: word,
      }),
      invalidatesTags: [{ type: 'Words', id: 'LIST' }],
    }),
    getUserWord: builder.query<IUserWordResponse, IUserWordRequest>({
      query: ({ userId, wordId }) => `/users/${userId}/words/${wordId}`,
      providesTags: (result, error, { wordId }) => [{ type: 'Words', id: wordId }],
    }),
    updateUserWord: builder.mutation<IUserWordResponse, IUpdateUserWordRequest>({
      query: ({ userId, wordId, word }) => ({
        url: `/users/${userId}/words/${wordId}`,
        method: 'PUT',
        body: word,
      }),
      invalidatesTags: (result, error, { wordId }) => [{ type: 'Words', id: wordId }],
    }),
    deleteUserWord: builder.mutation<null, IUserWordRequest>({
      query: ({ userId, wordId }) => ({
        url: `/users/${userId}/words/${wordId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { wordId }) => [{ type: 'Words', id: wordId }],
    }),
  }),
});

export const {
  useGetUserWordsQuery,
  useCreateUserWordMutation,
  useGetUserWordQuery,
  useUpdateUserWordMutation,
  useDeleteUserWordMutation,
} = userWordsApiSlice;
