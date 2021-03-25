import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { MovieApi } from '../api/api';
import { DESC_ORDER, MOVIES_SLICE_NAME } from '../constant';
import { availableFilterOptions, availableSortingOptions, moviesPerPage } from '../movie-config';
import { movieFromJson } from '../types';
import { toggleSortDirection } from '../utils/util-func';

const initialState = {
  movies: [],
  searchText: '',
  genreFilter: availableFilterOptions[0].id,
  sortField: availableSortingOptions[0].id,
  sortDirection: DESC_ORDER,
  detailMovie: null,
  isLoading: false,
  isShowDetail: false,
  pageLimit: moviesPerPage,
  currentPage: 1,
  foundMoviesCount: 0,
};

export const fetchMovies = createAsyncThunk(`${MOVIES_SLICE_NAME}/fetchMovies`, (data, { getState }) => {
  const {
    searchText: search,
    genreFilter,
    sortField: sortBy,
    pageLimit: limit,
    currentPage,
    sortDirection: sortOrder,
  } = getState().movies;
  const genres = genreFilter === availableFilterOptions[0].id ? [] : [genreFilter];
  const offset = (currentPage - 1) * limit;
  return MovieApi.getAll({ search, genres, sortBy, sortOrder, offset, limit });
});

const moviesSlice = createSlice({
  name: MOVIES_SLICE_NAME,
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
      state.genreFilter = availableFilterOptions[0].id;
      state.sortField = availableSortingOptions[0].id;
      state.currentPage = 1;
    },
    setGenreFilter(state, action) {
      state.genreFilter = action.payload;
    },
    setSortField(state, action) {
      if (state.sortField === action.payload) {
        state.sortDirection = toggleSortDirection(state.sortDirection);
      }
      state.sortField = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
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
  setCurrentPage,
} = moviesSlice.actions;

export default moviesSlice.reducer;

export const selectMovies = (state) => state.movies.movies;
export const selectDetailMovie = (state) => state.movies.detailMovie;
export const selectLoading = (state) => state.movies.isLoading;
export const selectShowDetail = (state) => state.movies.isShowDetail;
export const selectFoundMoviesCount = (state) => state.movies.foundMoviesCount;
export const selectGenreFilter = (state) => state.movies.genreFilter;
export const selectSortField = (state) => state.movies.sortField;
export const selectCurrentPage = (state) => state.movies.currentPage;
