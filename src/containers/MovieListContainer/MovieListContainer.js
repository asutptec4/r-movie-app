import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MovieList from '../../components/MovieList/MovieList';
import MovieListControl from '../../components/MovieListControl/MovieListControl';
import PageControl from '../../components/PageControl/PageControl';
import WithLoading from '../../hoc/WithLoading';
import WithNoFound from '../../hoc/WithNoFound';
import { availableFilterOptions, availableSortingOptions, moviesPerPage } from '../../movie-config';
import { openDialog } from '../../reducers/dialogSlice';
import {
  selectMovies,
  selectLoading,
  fetchMovies,
  selectFoundMoviesCount,
  selectGenreFilter,
  selectSortField,
  setGenreFilter,
  setSortField,
  selectCurrentPage,
  setCurrentPage,
} from '../../reducers/moviesSlice';
import { updateOptions } from '../../utils/util-func';
import MovieDialogContainer from '../MovieDialogContainer/MovieDialogContainer';

const MovieListWithLoading = WithLoading(WithNoFound(MovieList));

const MovieListContainer = () => {
  const isLoading = useSelector(selectLoading);
  const movies = useSelector(selectMovies);
  const foundMoviesCount = useSelector(selectFoundMoviesCount);
  const appliedSorting = useSelector(selectSortField);
  const appliedFilter = useSelector(selectGenreFilter);
  const currentPage = useSelector(selectCurrentPage);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCardAction = useCallback((action, movie) => {
    dispatch(openDialog({ action, movie }));
  }, []);

  const handleCardClick = useCallback((movie) => {
    history.push(`/movies/${movie.id}`);
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
