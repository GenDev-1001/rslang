import { apiSlice } from '../../app/api/apiSlice';
import { IWordsRequest, IWordsResponse } from './wordsSlice.interface';

export const wordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWords: builder.query<IWordsResponse[], IWordsRequest>({
      query: ({ page, group }) => `words?page=${page}&group=${group}`,
    }),
    getWord: builder.query<IWordsResponse, { id: string }>({
      query: ({ id }) => `words/${id}`,
    }),
  }),
});

export const { useGetWordQuery, useGetWordsQuery } = wordsApiSlice;
