import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { safeParse } from '../../common/utils/safeParse';
import { IPersonStatistic } from './statisticApiSlice.interface';
import { IStatisticState } from './statisticSlice.interface';

const localStatistic = safeParse<IStatisticState>(localStorage.getItem('statistic') || 'null') || {
  learnedWords: 0,
  statistics: [],
};

export const initialState: IStatisticState = localStatistic;

export const statisticsSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {
    setStatistics: (state, action: PayloadAction<IPersonStatistic>) => {
      state.learnedWords = action.payload.learnedWords;
      state.statistics = action.payload.statistics;
      localStorage.setItem('statistic', JSON.stringify(state));
    },
    resetStatistics: (state) => {
      state.learnedWords = 0;
      state.statistics = [];
      localStorage.removeItem('statistic');
    },
  },
});

export const { setStatistics, resetStatistics } = statisticsSlice.actions;

export const selectStatistic = (state: RootState) => state.statistic;

export default statisticsSlice.reducer;
