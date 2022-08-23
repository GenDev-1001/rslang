import { apiSlice } from '../../app/api/apiSlice';
import { IUserWordResponse } from './userWordsApiSlice.interface';

const userWordsApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['Words'] }).injectEndpoints({
  endpoints: (builder) => ({
    getUserWords: builder.query<IUserWordResponse[], string>({
      query: (id) => `users/${id}/words/${wordId || ''}`,
      providesTags: (result) =>
        result
          ? [
              { type: 'words', id: 'LIST' },
              ...result.map(({ wordId }) => ({ type: 'Words' as const, id: wordId })),
            ]
          : [{ type: 'Words', id: 'LIST' }],
    }),
  }),
});
