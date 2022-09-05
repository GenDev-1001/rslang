import { apiSlice } from '../../app/api/apiSlice';
import { safeParse } from '../../common/utils/safeParse';
import {
  IGetStatisticResponse,
  IPersonStatistic,
  IPutStatisticRequest,
  IStatistic,
} from './statisticApiSlice.interface';
import { setStatistics } from './statisticSlice';

const extStatisticRes = (response: IGetStatisticResponse): IPersonStatistic => {
  return {
    learnedWords: response.learnedWords,
    statistics: safeParse<IStatistic[]>(response.optional.statistics) || [],
  };
};

export const statisticApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Statistics'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getStatistic: builder.query<IPersonStatistic, string>({
        query: (userId) => ({
          url: `users/${userId}/statistics`,
        }),
        providesTags: [{ type: 'Statistics', id: 'LIST' }],
        transformResponse: extStatisticRes,
        onQueryStarted: (arg: string, { dispatch, queryFulfilled }) => {
          queryFulfilled.then((response) => dispatch(setStatistics(response.data))).catch(() => {});
        },
      }),
      putStatistic: builder.mutation<IPersonStatistic, IPutStatisticRequest>({
        query: ({ userId, statistic: { learnedWords, statistics } }) => ({
          url: `users/${userId}/statistics`,
          method: 'PUT',
          body: {
            learnedWords,
            optional: {
              statistics: JSON.stringify(statistics),
            },
          },
        }),
        invalidatesTags: [{ type: 'Statistics', id: 'LIST' }],
        transformResponse: extStatisticRes,
      }),
    }),
  });

export const { useGetStatisticQuery, usePutStatisticMutation } = statisticApiSlice;
