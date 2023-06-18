import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RadioInputStateType } from '../types';

const initialState: RadioInputStateType = {
  selectedRadioValue: null,
};

const radioInputsSlice = createSlice({
  name: 'radioInputs',
  initialState,
  reducers: {
    setRadioValue: (state, action: PayloadAction<number>) => {
      state.selectedRadioValue = action.payload;
    },
    resetRadioValue: (state) => {
      state.selectedRadioValue = null;
    },
  },
});

export const { setRadioValue, resetRadioValue } = radioInputsSlice.actions;
export default radioInputsSlice.reducer;
