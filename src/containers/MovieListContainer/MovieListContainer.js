import React, { useState } from 'react';

import MovieList from '../../components/MovieList/MovieList';
import MovieListControl from '../../components/MovieListControl/MovieListControl';
import WithLoading from '../../hoc/WithLoading';
import WithNoFound from '../../hoc/WithNoFound';
import MovieDialogContainer from '../MovieDialogContainer/MovieDialogContainer';

const movies = [1, 2, 3, 4, 5].map((v) => ({
  id: `${v}`,
  title: `Movie Title ${v}`,
  genres: ['Genre 1', 'Genre 2'],
  releaseYear: 2000 + v,
}));

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
  const [dialogAction, setDialogAction] = useState({ action: null, currentMovie: null });

  const handleCardAction = (action, movie) => {
    setDialogAction({ action: action, currentMovie: movie });
  };

  return (
    <>
      <MovieListControl filterOptions={genres} sortOptions={sortOptions} />
      <MovieListWithLoading
        isLoading={false}
        movieCount={movies.length}
        movies={movies}
        handleCardAction={handleCardAction}
      />
      <MovieDialogContainer action={dialogAction.action} movie={dialogAction.currentMovie} />
    </>
  );
};

export default MovieListContainer;
