import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';

import { MovieApi } from '../../api/api';
import MovieList from '../../components/MovieList/MovieList';
import MovieListControl from '../../components/MovieListControl/MovieListControl';
import WithLoading from '../../hoc/WithLoading';
import WithNoFound from '../../hoc/WithNoFound';
import { movieFromJson } from '../../types';
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

const MovieListContainer = ({ setSelectedMovie }) => {
  const [dialogAction, setDialogAction] = useState({ action: null, currentMovie: null });
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const handleCardAction = useCallback((action, movie) => {
    setDialogAction({ action: action, currentMovie: { ...movie } });
  }, []);

  const handleCardClick = useCallback((movie) => {
    setSelectedMovie({ ...movie });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    MovieApi.getAll()
      .then((r) => {
        if (r.status === 200) {
          const movies = r.data.data.map(movieFromJson);
          setMovies(movies);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <MovieListControl filterOptions={genres} sortOptions={sortOptions} />
      <MovieListWithLoading
        isLoading={isLoading}
        movies={movies}
        handleCardAction={handleCardAction}
        handleCardClick={handleCardClick}
      />
      <MovieDialogContainer action={dialogAction.action} movie={dialogAction.currentMovie} />
    </>
  );
};

MovieListContainer.propTypes = {
  setSelectedMovie: PropTypes.func.isRequired,
};

export default MovieListContainer;
