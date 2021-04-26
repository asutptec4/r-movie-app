import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MOVIES_PATH } from '../../constant';
import MovieDialogContainer from '../../containers/MovieDialogContainer/MovieDialogContainer';
import WithLoading from '../../hoc/WithLoading';
import WithNoFound from '../../hoc/WithNoFound';
import { availableFilterOptions, availableSortingOptions, moviesPerPage } from '../../movie-config';
import { openDialog } from '../../reducers/dialogSlice';
import {
  fetchMovies,
  selectCurrentPage,
  selectFoundMoviesCount,
  selectGenreFilter,
  selectLoading,
  selectMovies,
  selectSortField,
  setCurrentPage,
  setGenreFilter,
  setSortField,
} from '../../reducers/moviesSlice';
import { updateOptions } from '../../utils/util-func';
import MovieList from '../MovieList/MovieList';
import MovieListControl from '../MovieListControl/MovieListControl';
import PageControl from '../PageControl/PageControl';

const MovieListWithLoading = WithLoading(WithNoFound(MovieList));

const MovieListContainer = () => {
  const isLoading = useSelector(selectLoading);
  const movies = useSelector(selectMovies);
  const foundMoviesCount = useSelector(selectFoundMoviesCount);
  const appliedSorting = useSelector(selectSortField);
  const appliedFilter = useSelector(selectGenreFilter);
  const currentPage = useSelector(selectCurrentPage);
  const dispatch = useDispatch();
  const history = useRouter();

  const handleCardAction = useCallback((action, movie) => {
    dispatch(openDialog({ action, movie }));
  }, []);

  const handleCardClick = useCallback((movie) => {
    history.push(`${MOVIES_PATH}/${movie.id}`);
  }, []);

  const handleFilterChange = useCallback((option) => {
    dispatch(setGenreFilter(option.id));
    dispatch(fetchMovies());
  }, []);

  const handleSortChange = useCallback((option) => {
    dispatch(setSortField(option.id));
    dispatch(fetchMovies());
  }, []);

  const handlePageChange = useCallback((newPage) => {
    dispatch(setCurrentPage(newPage));
    dispatch(fetchMovies());
  }, []);

  return (
    <>
      <MovieListControl
        filterOptions={updateOptions(availableFilterOptions, appliedFilter)}
        sortOptions={updateOptions(availableSortingOptions, appliedSorting)}
        handleFilterChange={handleFilterChange}
        handleSortChange={handleSortChange}
      />
      <MovieListWithLoading
        isLoading={isLoading}
        movies={movies}
        foundMoviesCount={foundMoviesCount}
        movieCount={movies.length}
        handleCardAction={handleCardAction}
        handleCardClick={handleCardClick}
      />
      <PageControl
        currentPage={currentPage}
        itemPerPage={moviesPerPage}
        totalItemCount={foundMoviesCount}
        handlePageChange={handlePageChange}
      ></PageControl>
      <MovieDialogContainer />
    </>
  );
};

export default MovieListContainer;
