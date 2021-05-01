import PropTypes from 'prop-types';
import React from 'react';

import { movieCardOptions } from '../../movie-config';
import { movieType } from '../../types/movie';
import { defaultHandler } from '../../utils/util-func';
import MoviePoster from '../MoviePoster/MoviePoster';
import SingleSelectDropdown from '../SingleSelectDropdown/SingleSelectDropdown';
import styles from './MovieCard.module.scss';

const Button = () => {
  return (
    <div className={styles.movieOptionsButton}>
      <div>...</div>
    </div>
  );
};

const MovieCard = ({ movie, handleCardAction, handleCardClick }) => {
  return (
    <div className={styles.movieCard}>
      <div className={styles.movieImage} onClick={() => handleCardClick(movie)}>
        <MoviePoster imageUrl={movie.poster} />
      </div>
      <div className={styles.movieDesc}>
        <span className={styles.title}>{movie.title}</span>
        <span className={styles.genre}>{movie.genres ? movie.genres.join(' ') : ''}</span>
        <span className={styles.year}>{movie.releaseYear}</span>
      </div>
      <div className={styles.button}>
        <SingleSelectDropdown
          options={movieCardOptions}
          customButton={<Button />}
          onOptionChange={(o) => handleCardAction(o?.id, movie)}
        />
      </div>
    </div>
  );
};

MovieCard.defaultProps = {
  handleCardAction: defaultHandler,
  handleCardClick: defaultHandler,
};

MovieCard.propTypes = {
  movie: movieType,
  handleCardAction: PropTypes.func,
  handleCardClick: PropTypes.func,
};

export default MovieCard;
