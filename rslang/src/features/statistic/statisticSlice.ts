import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IPersonStatistic } from './statisticApiSlice.interface';
import { IStatisticState } from './statisticSlice.interface';

export const initialState: IStatisticState = Object.freeze({
  learnedWords: 0,
  statistics: [],
});

export const statisticsSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {
    setStatistics: (state, action: PayloadAction<IPersonStatistic>) => {
      state.learnedWords = action.payload.learnedWords;
      state.statistics = action.payload.statistics;
    },
  },
});

export const { setStatistics } = statisticsSlice.actions;

export const selectStatistic = (state: RootState) => state.statistic;

export default statisticsSlice.reducer;
