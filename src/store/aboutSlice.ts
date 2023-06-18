import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  aboutValue: '',
};

const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    setAboutValue: (state, { payload }: PayloadAction<string>) => {
      state.aboutValue = payload;
    },
    resetAboutValue: (state) => {
      state.aboutValue = '';
    },
  },
});

export const { setAboutValue, resetAboutValue } = aboutSlice.actions;
export default aboutSlice.reducer;
