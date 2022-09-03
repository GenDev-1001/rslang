import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ISettingsState } from './settings.interface';

const localPage = localStorage.getItem('currentPage');
const localGroup = localStorage.getItem('currentGroup');

const initialState: ISettingsState = {
  page: localPage ? +localPage : 1,
  group: localGroup ? +localGroup : 0,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
      localStorage.setItem('currentPage', String(action.payload));
    },
    setGroup(state, action: PayloadAction<number>) {
      state.group = action.payload;
      localStorage.setItem('currentGroup', String(action.payload));
    },
  },
});

export const { setPage, setGroup } = settingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings;

export default settingsSlice.reducer;
