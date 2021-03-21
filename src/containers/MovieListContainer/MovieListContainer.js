import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MovieList from '../../components/MovieList/MovieList';
import MovieListControl from '../../components/MovieListControl/MovieListControl';
import WithLoading from '../../hoc/WithLoading';
import WithNoFound from '../../hoc/WithNoFound';
import { openDialog } from '../../reducers/dialogSlice';
import { selectMovies, selectLoading, setDetailMovie, showDetail, fetchMovies } from '../../reducers/moviesSlice';
import MovieDialogContainer from '../MovieDialogContainer/MovieDialogContainer';

const genres = [
  { id: 'all', name: 'All', selected: true },
  { id: 'doc', name: 'Documentary' },
  { id: 'com', name: 'Comedy' },
  { id: 'hor', name: 'Horror' },
  { id: 'cri', name: 'Crime' },
];

const sortOptions = [
  { id: 'date', name: 'Release Date', selected: true },
  { id: 'votes', name: 'Average Votes' },
];

const MovieListWithLoading = WithLoading(WithNoFound(MovieList));

const MovieListContainer = () => {
  const isLoading = useSelector(selectLoading);
  const movies = useSelector(selectMovies);

  const dispatch = useDispatch();

  const handleCardAction = useCallback((action, movie) => {
    dispatch(openDialog({ action, movie }));
  }, []);

  const handleCardClick = useCallback((movie) => {
    dispatch(setDetailMovie(movie));
    dispatch(showDetail());
  }, []);

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  return (
    <>
      <MovieListControl filterOptions={genres} sortOptions={sortOptions} />
      <MovieListWithLoading
        isLoading={isLoading}
        movies={movies}
        movieCount={movies.length}
        handleCardAction={handleCardAction}
        handleCardClick={handleCardClick}
      />
      <MovieDialogContainer />
    </>
  );
};

export default MovieListContainer;
