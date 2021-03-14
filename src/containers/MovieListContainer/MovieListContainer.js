import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';

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
  duration: 20 * v,
  rating: Math.random() * 5,
  overview: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra mauris elit. Aliquam elementum diam vel nisl luctus,
   sit amet viverra nibh porttitor. Quisque ac magna sit amet nunc semper gravida non ut diam. Integer vel elit nec lectus aliquet commodo.
    Pellentesque gravida eleifend ornare. Maecenas vel porttitor diam. Donec quis lorem vulputate, consectetur turpis non, faucibus sem.
     Vivamus ut pellentesque nisl, auctor feugiat quam. Morbi fringilla malesuada ligula eget pulvinar. Sed malesuada bibendum ullamcorper.
      Donec sollicitudin placerat scelerisque. Integer volutpat nisl enim, vel elementum urna viverra vitae.`,
  runtime: 'Lorem ipsum dolor sit amet.',
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

const MovieListContainer = ({ setSelectedMovie }) => {
  const [dialogAction, setDialogAction] = useState({ action: null, currentMovie: null });

  const handleCardAction = useCallback((action, movie) => {
    setDialogAction({ action: action, currentMovie: { ...movie } });
  }, []);

  const handleCardClick = useCallback((movie) => {
    setSelectedMovie({ ...movie });
  }, []);

  return (
    <>
      <MovieListControl filterOptions={genres} sortOptions={sortOptions} />
      <MovieListWithLoading
        isLoading={false}
        movieCount={movies.length}
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
