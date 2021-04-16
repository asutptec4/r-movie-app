import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { MovieApi } from '../api/api';
import { DETAILS_SLICE_NAME } from '../constant';
import { movieFromJson } from '../types';

const initialState = {
  detailMovie: null,
  isLoading: false,
  isNotFound: false,
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
    resetIsNotFound(state) {
      state.isNotFound = false;
    },
  },
  extraReducers: {
    [fetchMovie.pending]: (state) => {
      state.isLoading = true;
      state.isNotFound = false;
    },
    [fetchMovie.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.detailMovie = movieFromJson(action.payload?.data);
    },
    [fetchMovie.rejected]: (state) => {
      state.isLoading = false;
      state.isNotFound = true;
    },
  },
});

export const { resetMovie, resetIsNotFound } = detailsSlice.actions;

export default detailsSlice.reducer;

export const selectDetailMovie = (state) => state.details.detailMovie;
export const selectLoading = (state) => state.details.isLoading;
export const selectNotFound = (state) => state.details.isNotFound;
