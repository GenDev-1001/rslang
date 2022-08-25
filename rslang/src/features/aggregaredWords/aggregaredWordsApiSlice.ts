import { apiSlice } from '../../app/api/apiSlice';
import { FILTER_PARAMS } from '../../common/constants/constants';
import {
  IActiveWordsByUser,
  IActiveWordsResponse,
  IAggregatedWordsData,
  IAggregatedWordsRequest,
  IAggregatedWordsResponse,
  ICountWordsByGroup,
} from './aggregaredWordsApiSlice.inteface';

const extWordsRes = (response: [IAggregatedWordsData]) => {
  const data = response[0];
  return {
    paginatedResults: data.paginatedResults.map(({ _id, ...word }) => ({
      id: _id,
      ...word,
    })),
    totalCount: data.totalCount.length ? data.totalCount[0].count : 0,
  };
};

export const aggregatedWordsApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ['WordsAggregate'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      dictionaryWords: builder.query<IAggregatedWordsResponse, IAggregatedWordsRequest>({
        query: ({ userId, group, page, difficulty }) => ({
          url: `users/${userId}/aggregatedWords`,
          params: {
            group,
            page,
            wordsPerPage: 20,
            filter: FILTER_PARAMS.dictionary(difficulty),
          },
        }),
        transformResponse: extWordsRes,
        providesTags: (result) =>
          result
            ? [
                { type: 'WordsAggregate', id: 'LIST' },
                ...result.paginatedResults.map(({ id }) => ({
                  type: 'WordsAggregate' as const,
                  id,
                })),
              ]
            : [{ type: 'WordsAggregate', id: 'LIST' }],
      }),
      countWordsByGroup: builder.query<number, ICountWordsByGroup>({
        query: ({ userId, group }) => ({
          url: `users/${userId}/aggregatedWords`,
          params: {
            group,
            page: 0,
            wordsPerPage: 1,
            filter: FILTER_PARAMS.count,
          },
        }),
        transformResponse: (response: [IAggregatedWordsData]) =>
          response[0]?.totalCount[0]?.count || 0,
      }),
      activeWordsByUser: builder.query<IActiveWordsResponse, IActiveWordsByUser>({
        query: ({ userId, group, page }) => ({
          url: `users/${userId}/aggregatedWords`,
          params: {
            group,
            page,
            wordsPerPage: 20,
            filter: FILTER_PARAMS.active,
          },
        }),
        transformResponse: extWordsRes,
        providesTags: (result) =>
          result
            ? [
                { type: 'WordsAggregate', id: 'LIST' },
                ...result.paginatedResults.map(({ id }) => ({
                  type: 'WordsAggregate' as const,
                  id,
                })),
              ]
            : [{ type: 'WordsAggregate', id: 'LIST' }],
      }),
    }),
  });

export const { useDictionaryWordsQuery, useCountWordsByGroupQuery, useActiveWordsByUserQuery } =
  aggregatedWordsApiSlice;
