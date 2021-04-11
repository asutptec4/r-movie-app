import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { MovieApi } from '../api/api';
import { DETAILS_SLICE_NAME } from '../constant';
import { movieFromJson } from '../types';

const initialState = {
  detailMovie: null,
  isLoading: false,
};

export const fetchMovie = createAsyncThunk(`${DETAILS_SLICE_NAME}/fetchMovie`, (id) => {
  return MovieApi.getById(id);
});

const detailsSlice = createSlice({
  name: DETAILS_SLICE_NAME,
  initialState,
  reducers: {
    resetMovie(state) {
      state.detailMovie = null;
    },
  },
  extraReducers: {
    [fetchMovie.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchMovie.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.detailMovie = movieFromJson(action.payload?.data);
    },
    [fetchMovie.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { resetMovie } = detailsSlice.actions;

export default detailsSlice.reducer;

export const selectDetailMovie = (state) => state.details.detailMovie;
export const selectLoading = (state) => state.details.isLoading;
export const selectShowDetail = (state) => state.details.isShowDetail;
