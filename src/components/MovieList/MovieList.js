import PropTypes from 'prop-types';
import React from 'react';

import MovieCard from '../MovieCard/MovieCard';
import MovieCounter from '../MovieCounter/MovieCounter';
import './MovieList.scss';

const MovieList = ({ movies }) => {
  return (
    <>
      <MovieCounter movieCount={movies.length} />
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

MovieList.defaultProps = {
  movies: [],
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(MovieCard.propTypes),
};

export default MovieList;
