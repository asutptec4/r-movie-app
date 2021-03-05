import React, { useState } from 'react';

import DeleteMovieForm from '../../components/DeleteMovieForm/DeleteMovieForm';
import Dialog from '../../components/Dialog/Dialog';
import MovieList from '../../components/MovieList/MovieList';
import MovieListControl from '../../components/MovieListControl/MovieListControl';
import WithLoading from '../../hoc/WithLoading';
import WithNoFound from '../../hoc/WithNoFound';

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
  const [showModal, setShowModal] = useState(false);
  const [dialogMovie, setDialogMovie] = useState(null);

  const handleCardAction = (action, movie) => {
    console.log(action, movie);
    setDialogMovie(movie);
    if (action && action.id === 'delete') {
      setShowModal(true);
    }
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
      {showModal && (
        <Dialog handleClose={(e) => setShowModal(false)}>
          <DeleteMovieForm movie={dialogMovie} />
        </Dialog>
      )}
    </>
  );
};

export default MovieListContainer;
