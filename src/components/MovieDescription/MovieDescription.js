import PropTypes from 'prop-types';
import React from 'react';

import { movieType } from '../../types';
import { defaultHandler, ratingToStr } from '../../utils/util-func';
import MoviePoster from '../MoviePoster/MoviePoster';
import styles from './MovieDescription.module.scss';

const MovieDescription = ({ movie, closeButtonHandler }) => {
  return (
    <section className={styles.movieDescriptionContainer}>
      <div className={styles.movieDescriptionButtons}>
        <div className={styles.iconContainer} onClick={closeButtonHandler}>
          <span className={styles.iconGlass}></span>
        </div>
      </div>
      {movie?.id && (
        <div className={styles.movieDescription}>
          <div className={styles.movieImage}>
            <MoviePoster imageUrl={movie.poster} />
          </div>
          <div className={styles.description}>
            <p className={styles.movieTitle}>
              <span className={styles.title}>{movie.title}</span>
              <span className={`${styles.rating} ${styles[ratingToStr(movie.rating)]}`}>{movie.rating}</span>
            </p>
            <span className={styles.movieTuntime}>{movie.tagline}</span>
            <p className={styles.movieDuration}>
              <span>{movie.releaseYear}</span>
              <span>{movie.runtime} min</span>
            </p>
            <p className={styles.movieOverview}>{movie.overview}</p>
          </div>
        </div>
      )}
    </section>
  );
};

MovieDescription.defaultProps = {
  closeButtonHandler: defaultHandler,
};

MovieDescription.propTypes = { closeButtonHandler: PropTypes.func, movie: movieType };

export default MovieDescription;
