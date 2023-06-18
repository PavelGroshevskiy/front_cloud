import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isModalShow: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setShowModal: (state, { payload }: PayloadAction<boolean>) => {
      state.isModalShow = payload;
    },
  },
});

export const { setShowModal } = modalsSlice.actions;
export default modalsSlice.reducer;
