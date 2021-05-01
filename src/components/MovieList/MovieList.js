import PropTypes from 'prop-types';
import React from 'react';

import { movie } from '../../types/movie';
import { defaultHandler } from '../../utils/util-func';
import MovieCard from '../MovieCard/MovieCard';
import MovieCounter from '../MovieCounter/MovieCounter';
import styles from './MovieList.module.scss';

const MovieList = ({ movies, foundMoviesCount, handleCardAction, handleCardClick }) => {
  return (
    <>
      <MovieCounter movieCount={foundMoviesCount} />
      <div className={styles.movieList}>
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
  handleCardAction: defaultHandler,
  handleCardClick: defaultHandler,
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(movie),
  foundMoviesCount: PropTypes.number.isRequired,
  handleCardAction: PropTypes.func,
  handleCardClick: PropTypes.func,
};

export default MovieList;
