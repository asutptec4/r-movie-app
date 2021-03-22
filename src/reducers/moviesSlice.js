import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { MovieApi } from '../api/api';
import { availableFilterOptions, availableSortingOptions, moviesPerPage } from '../movie-config';
import { movieFromJson } from '../types';

const initialState = {
  movies: [],
  searchText: '',
  genreFilter: availableFilterOptions[0].id,
  sortField: availableSortingOptions[0].id,
  detailMovie: null,
  isLoading: false,
  isShowDetail: false,
  pageLimit: moviesPerPage,
  currentPage: 1,
  foundMoviesCount: 0,
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', (data, { getState }) => {
  const { searchText: search, genreFilter, sortField: sortBy, pageLimit: limit } = getState().movies;
  const genres = genreFilter === availableFilterOptions[0].id ? [] : [genreFilter];
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
    setGenreFilter(state, action) {
      state.genreFilter = action.payload;
    },
    setSortField(state, action) {
      state.sortField = action.payload;
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

export const {
  setDetailMovie,
  showDetail,
  hideDetail,
  setSearchText,
  setGenreFilter,
  setSortField,
} = counterSlice.actions;

export default counterSlice.reducer;

export const selectMovies = (state) => state.movies.movies;
export const selectDetailMovie = (state) => state.movies.detailMovie;
export const selectLoading = (state) => state.movies.isLoading;
export const selectShowDetail = (state) => state.movies.isShowDetail;
export const selectFoundMoviesCount = (state) => state.movies.foundMoviesCount;
export const selectGenreFilter = (state) => state.movies.genreFilter;
export const selectSortField = (state) => state.movies.sortField;
