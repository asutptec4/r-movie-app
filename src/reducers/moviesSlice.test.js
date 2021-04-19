import testJson from '../__mocks__/test-data.json';
import { ASC_ORDER, DESC_ORDER } from '../constant';
import { availableFilterOptions, availableSortingOptions, moviesPerPage } from '../movie-config';
import reducer, {
  setSearchText,
  selectSearchText,
  setGenreFilter,
  setSortField,
  selectSortField,
  selectCurrentPage,
  setCurrentPage,
  selectMovies,
  selectLoading,
  selectFoundMoviesCount,
  selectGenreFilter,
} from './moviesSlice';

describe('moviesSlice', () => {
  const initState = {
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

  test('should return the initial state on first run', () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  test('should handle setSearchText action', () => {
    const searchText = 'test';
    const nextState = reducer(initState, setSearchText(searchText));
    const rootState = { movies: nextState };
    expect(selectSearchText(rootState)).toEqual(searchText);
    expect(selectGenreFilter(rootState)).toEqual(availableFilterOptions[0].id);
    expect(selectSortField(rootState)).toEqual(availableSortingOptions[0].id);
    expect(selectCurrentPage(rootState)).toEqual(1);
  });

  test('should handle setGenreFilter action', () => {
    const genre = 'newGenre';
    const nextState = reducer(initState, setGenreFilter(genre));
    expect(selectGenreFilter({ movies: nextState })).toEqual(genre);
  });

  test('should handle setSortField action', () => {
    const sortField = 'sortField';
    let nextState = reducer(initState, setSortField(sortField));
    expect(selectSortField({ movies: nextState })).toEqual(sortField);
    expect(nextState.sortDirection).toEqual(DESC_ORDER);
    nextState = reducer(nextState, setSortField(sortField));
    expect(nextState.sortDirection).toEqual(ASC_ORDER);
  });

  test('should handle setCurrentPage action', () => {
    const nextState = reducer(initState, setCurrentPage(2));
    expect(selectCurrentPage({ movies: nextState })).toEqual(2);
  });

  test('should handle fetchMovies/pending action', () => {
    const nextState = reducer(initState, {
      type: 'movies/fetchMovies/pending',
      payload: undefined,
    });
    expect(selectLoading({ movies: nextState })).toBeTruthy();
  });

  test('should handle fetchMovies/fulfilled action', () => {
    const nextState = reducer(
      { ...initState, isLoading: true },
      {
        type: 'movies/fetchMovies/fulfilled',
        payload: { data: { data: testJson, totalAmount: 2 } },
      },
    );
    const rootState = { movies: nextState };
    expect(selectLoading(rootState)).toBeFalsy();
    expect(selectMovies(rootState)).toHaveLength(2);
    expect(selectFoundMoviesCount(rootState)).toBe(2);
  });

  test('should handle fetchMovie/rejected action', () => {
    const nextState = reducer(
      { ...initState, isLoading: true },
      {
        type: 'movies/fetchMovies/rejected',
        payload: undefined,
      },
    );
    expect(selectLoading({ movies: nextState })).toBeFalsy();
  });
});
