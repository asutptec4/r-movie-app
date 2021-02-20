import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../../assets/card.jpg';
import './MovieCard.scss';

const MovieCard = (props) => {
  return (
    <div className="movie-card">
      <img src={Icon} alt="Movie poster" className="movie-image"></img>
      <div className="movie-desc">
        <span className="title">{props.movie.title}</span>
        <span className="genre">{props.movie.genres ? props.movie.genres.join(' ') : ''}</span>
        <span className="year">{props.movie.releaseYear}</span>
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
