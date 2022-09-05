import {
  useDictionaryWordsQuery,
  useCountWordsByGroupQuery,
  useActiveWordsByUserQuery,
} from './aggregaredWords/aggregaredWordsApiSlice';
import { useAuthMutation } from './auth/authApiSlice';
import { selectAuth } from './auth/authSlice';
import { selectSettings, setPage, setGroup } from './settings/settingsSlice';
import { useGetStatisticQuery, usePutStatisticMutation } from './statistic/statisticApiSlice';
import { selectStatistic, setStatistics } from './statistic/statisticSlice';
import { getStatistic } from './statistic/statisticSliceHelper';
import { useCreateUserMutation, useGetUserQuery } from './user/userApiSlice';
import {
  useGetUserWordsQuery,
  useCreateUserWordMutation,
  useGetUserWordQuery,
  useUpdateUserWordMutation,
  useDeleteUserWordMutation,
} from './userWords/userWordsApiSlice';
import { useGetWordQuery, useGetWordsQuery } from './words/wordsApiSlice';
import { StatisticGameEnum } from './statistic/statisticApiSlice.interface';

export {
  useDictionaryWordsQuery,
  useCountWordsByGroupQuery,
  useActiveWordsByUserQuery,
  useAuthMutation,
  selectAuth,
  selectSettings,
  setPage,
  setGroup,
  useGetStatisticQuery,
  usePutStatisticMutation,
  selectStatistic,
  getStatistic,
  setStatistics,
  useCreateUserMutation,
  useGetUserQuery,
  useGetUserWordsQuery,
  useCreateUserWordMutation,
  useGetUserWordQuery,
  useUpdateUserWordMutation,
  useDeleteUserWordMutation,
  useGetWordQuery,
  useGetWordsQuery,
  StatisticGameEnum,
};
