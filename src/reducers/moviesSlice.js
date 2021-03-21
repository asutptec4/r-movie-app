import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { MovieApi } from '../api/api';
import { movieFromJson } from '../types';

const initialState = {
  movies: [],
  searchText: '',
  genreFilters: [],
  sortField: 'release_date',
  detailMovie: null,
  isLoading: false,
  isShowDetail: false,
  pageLimit: 6,
  currentPage: 1,
  foundMoviesCount: 0,
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', (data, { getState }) => {
  const { searchText: search, genreFilters: genres, sortField: sortBy, pageLimit: limit } = getState().movies;
  const offset = 0;
  return MovieApi.getAll({ search, genres, sortBy, offset, limit });
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
    setSearchText(state, action) {
      state.searchText = action.payload;
    },
  },
  extraReducers: {
    [fetchMovies.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchMovies.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movies = action.payload?.data?.data.map(movieFromJson);
      state.foundMoviesCount = action.payload?.data?.totalAmount;
    },
    [fetchMovies.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setDetailMovie, showDetail, hideDetail, setSearchText } = counterSlice.actions;

export default counterSlice.reducer;

export const selectMovies = (state) => state.movies.movies;
export const selectDetailMovie = (state) => state.movies.detailMovie;
export const selectLoading = (state) => state.movies.isLoading;
export const selectShowDetail = (state) => state.movies.isShowDetail;
export const selectFoundMoviesCount = (state) => state.movies.foundMoviesCount;
