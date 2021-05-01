import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { MovieApi } from '../api/api';
import { DESC_ORDER, MOVIES_SLICE_NAME } from '../constant';
import { availableFilterOptions, availableSortingOptions, moviesPerPage } from '../movie-config';
import { movieFromJson } from '../types';
import { toggleSortDirection } from '../utils/util-func';

const initialState = {
  movies: [],
  searchText: '',
  genreFilter: null,
  sortField: availableSortingOptions[0].id,
  sortDirection: DESC_ORDER,
  isLoading: false,
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

const hydrate = createAction(HYDRATE);

const moviesSlice = createSlice({
  name: MOVIES_SLICE_NAME,
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload[moviesSlice.name],
        };
      })
      .addCase(fetchMovies.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          movies: action.payload?.data?.data.map(movieFromJson),
          foundMoviesCount: action.payload?.data?.totalAmount,
        };
      })
      .addCase(fetchMovies.rejected, (state) => {
        return {
          ...state,
          isLoading: false,
        };
      });
  },
});

export const { setSearchText, setGenreFilter, setSortField, setCurrentPage } = moviesSlice.actions;

export default moviesSlice.reducer;

export const selectMovies = (state) => state.movies.movies;
export const selectLoading = (state) => state.movies.isLoading;
export const selectFoundMoviesCount = (state) => state.movies.foundMoviesCount;
export const selectGenreFilter = (state) => state.movies.genreFilter;
export const selectSortField = (state) => state.movies.sortField;
export const selectCurrentPage = (state) => state.movies.currentPage;
export const selectSearchText = (state) => state.movies.searchText;
