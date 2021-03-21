import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { MovieApi } from '../api/api';
import { movieFromJson } from '../types';

const initialState = {
  movies: [],
  filters: [],
  sorting: null,
  detailMovie: null,
  isLoading: false,
  isShowDetail: false,
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', () => {
  return MovieApi.getAll();
});

const counterSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setDetailMovie(state, action) {
      state.detailMovie = action.payload;
    },
    showDetail(state) {
      state.isShowDetail = true;
    },
    hideDetail(state) {
      state.isShowDetail = false;
    },
  },
  extraReducers: {
    [fetchMovies.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchMovies.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movies = action.payload?.data?.data.map(movieFromJson);
    },
    [fetchMovies.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setDetailMovie, showDetail, hideDetail } = counterSlice.actions;

export default counterSlice.reducer;

export const selectMovies = (state) => state.movies.movies;
export const selectDetailMovie = (state) => state.movies.detailMovie;
export const selectLoading = (state) => state.movies.isLoading;
export const selectShowDetail = (state) => state.movies.isShowDetail;
