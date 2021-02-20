import React from 'react';

import MovieList from '../../components/MovieList/MovieList';
import MovieListControl from '../../components/MovieListControl/MovieListControl';
import WithLoading from '../../components/WithLoading/WithLoading';

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

const WithNoFound = (Component) => {
  const func = ({ movieCount, ...props }) => {
    if (movieCount) {
      return <Component {...props} />;
    }
    return <div className="c-no-content-label">No Movie Found</div>;
  };
  return func;
};

const MovieListWithLoading = WithLoading(WithNoFound(MovieList));

const MovieListContainer = () => {
  return (
    <>
      <MovieListControl filterOptions={genres} sortOptions={sortOptions} />
      <MovieListWithLoading isLoading={false} movieCount={movies.length} movies={movies} />
    </>
  );
};

export default MovieListContainer;
