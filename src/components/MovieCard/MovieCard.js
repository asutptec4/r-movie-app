import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../../assets/card.jpg';
import './MovieCard.scss';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={Icon} alt="Movie poster" className="movie-image"></img>
      <div className="movie-desc">
        <span className="title">{movie.title}</span>
        <span className="genre">{movie.genres ? movie.genres.join(' ') : ''}</span>
        <span className="year">{movie.releaseYear}</span>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.exact({
    id: PropTypes.string,
    title: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    releaseYear: PropTypes.number,
  }),
};

export default MovieCard;
