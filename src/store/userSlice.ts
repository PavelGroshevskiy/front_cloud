import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataPostType, Gender, UserStateType } from '../types';

export const postUserData = createAsyncThunk(
  'user/postUserData',
  async (userData: DataPostType, { rejectWithValue }) => {
    const url = 'https://api.sbercloud.ru/content/v1/bootcamp/frontend';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      return rejectWithValue(`error, status ${response.status}`);
    }
  },
);

const initialState: UserStateType = {
  step1: {
    nickname: '',
    name: '',
    surname: '',
    sex: '',
  },
  postData: {
    error: null,
    isLoading: false,
    postResponse: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setNickName(state, { payload }: PayloadAction<string>) {
      state.step1.nickname = payload;
    },
    setName(state, { payload }: PayloadAction<string>) {
      state.step1.name = payload;
    },
    setSurname(state, { payload }: PayloadAction<string>) {
      state.step1.surname = payload;
    },
    setSex(state, { payload }: PayloadAction<Gender>) {
      state.step1.sex = payload;
    },
    resetUserState(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postUserData.pending, (state) => {
        state.postData.error = null;
        state.postData.isLoading = true;
      })
      .addCase(postUserData.rejected, (state, { payload }: PayloadAction<any>) => {
        state.postData.error = payload;
        state.postData.isLoading = false;
      })
      .addCase(postUserData.fulfilled, (state, { payload }) => {
        state.postData.error = null;
        state.postData.postResponse = payload;
        state.postData.isLoading = false;
      });
  },
});

export const {
  setNickName,
  setName,
  setSurname,
  setSex,
  resetUserState,
} = userSlice.actions;
export default userSlice.reducer;
