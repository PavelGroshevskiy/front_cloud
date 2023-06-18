import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import progressBarSlice from './progressBarSlice';
import advantagesSlice from './advantagesSlice';
import checkBoxesSlice from './checkBoxesSlice';
import radioInputsSlice from './radioInputsSlice';
import aboutSlice from './aboutSlice';
import modalsSlice from './modalsSlice';

const store = configureStore({
  reducer: {
    userSlice,
    progressBarSlice,
    advantagesSlice,
    checkBoxesSlice,
    radioInputsSlice,
    aboutSlice,
    modalsSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
