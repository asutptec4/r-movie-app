import PropTypes from 'prop-types';
import React from 'react';

import { movie } from '../../types/movie';
import MovieCard from '../MovieCard/MovieCard';
import MovieCounter from '../MovieCounter/MovieCounter';
import './MovieList.scss';

const MovieList = ({ movies, handleCardAction, handleCardClick }) => {
  return (
    <>
      <MovieCounter movieCount={movies.length} />
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            handleCardAction={handleCardAction}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
    </>
  );
};

MovieList.defaultProps = {
  movies: [],
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(movie),
  handleCardAction: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired,
};

export default MovieList;
