import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Advantage, AdvantageStateType } from '../types';

const initialState: AdvantageStateType = {
  advantages: [
    { id: 1, value: '' },
    { id: 2, value: '' },
    { id: 3, value: '' },
  ],
};

const advantagesSlice = createSlice({
  name: 'advantages',
  initialState,
  reducers: {
    addNewAdvantage(state, { payload }: PayloadAction<Advantage>) {
      state.advantages = [...state.advantages, payload];
    },
    deleteAdvantage(state, { payload }: PayloadAction<number>) {
      state.advantages = state.advantages.filter(({ id }) => id !== payload);
    },
    setAdvantageValueById(state, { payload }: PayloadAction<Advantage>) {
      const { id, value } = payload;
      state.advantages = state.advantages.map((advantage) => (advantage.id === id ? { ...advantage, value } : advantage));
    },
    reseteAdvantages(state) {
      state.advantages = initialState.advantages;
    },
  },
});

export const {
  addNewAdvantage,
  deleteAdvantage,
  setAdvantageValueById,
  reseteAdvantages,
} = advantagesSlice.actions;
export default advantagesSlice.reducer;
