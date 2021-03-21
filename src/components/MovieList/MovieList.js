import PropTypes from 'prop-types';
import React from 'react';

import { movie } from '../../types/movie';
import MovieCard from '../MovieCard/MovieCard';
import MovieCounter from '../MovieCounter/MovieCounter';
import './MovieList.scss';

const MovieList = ({ movies, foundMoviesCount, handleCardAction, handleCardClick }) => {
  return (
    <>
      <MovieCounter movieCount={foundMoviesCount} />
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
  foundMoviesCount: PropTypes.number.isRequired,
  handleCardAction: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired,
};

export default MovieList;
