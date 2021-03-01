import React from 'react';

import Icon from '../../assets/card.jpg';
import { movie } from '../../types/movie';
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
  movie: movie,
};

export default MovieCard;
