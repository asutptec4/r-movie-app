import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../../assets/card.jpg';
import { movie } from '../../types';
import { ratingToStr, roundRating } from '../../utils/util-func';
import './MovieDescription.scss';

const MovieDescription = ({ movie, closeButtonHandler }) => {
  return (
    <section className="movie-description-container">
      <div className="movie-description-buttons">
        <span className="logo app-logo">NetflixRoulette</span>
        <div className="icon-container" onClick={closeButtonHandler}>
          <span className="icon-glass"></span>
        </div>
      </div>
      {movie?.id && (
        <div className="movie-description">
          <img src={Icon} alt="Movie poster" className="movie-image"></img>
          <div className="description">
            <p className="movie-title">
              <span className="title">{movie.title}</span>
              <span className={'rating ' + ratingToStr(movie.rating)}>{roundRating(movie.rating)}</span>
            </p>
            <span className="movie-runtime">{movie.runtime}</span>
            <p className="movie-duration">
              <span>{movie.releaseYear}</span>
              <span>{movie.duration} min</span>
            </p>
            <p className="movie-overview">{movie.overview}</p>
          </div>
        </div>
      )}
    </section>
  );
};

MovieDescription.defaultProps = {
  closeButtonHandler: () => {},
};

MovieDescription.propTypes = { closeButtonHandler: PropTypes.func, movie: movie };

export default MovieDescription;
