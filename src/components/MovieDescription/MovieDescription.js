import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Icon from '../../assets/image-not-found.png';
import { movie } from '../../types';
import { ratingToStr } from '../../utils/util-func';
import './MovieDescription.scss';

const MovieDescription = ({ movie, closeButtonHandler }) => {
  const [image, setImage] = useState(movie.poster);

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
          {/* TODO: make new component */}
          <img
            src={image}
            alt="Movie poster"
            className="movie-image"
            onError={(e) => {
              setImage(Icon);
            }}
          ></img>
          <div className="description">
            <p className="movie-title">
              <span className="title">{movie.title}</span>
              <span className={'rating ' + ratingToStr(movie.rating)}>{movie.rating}</span>
            </p>
            <span className="movie-runtime">{movie.tagline}</span>
            <p className="movie-duration">
              <span>{movie.releaseYear}</span>
              <span>{movie.runtime} min</span>
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
