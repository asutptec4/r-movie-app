import PropTypes from 'prop-types';
import React from 'react';

import { movieCardOptions } from '../../movie-config';
import { movie } from '../../types/movie';
import { defaultHandler } from '../../utils/util-func';
import MoviePoster from '../MoviePoster/MoviePoster';
import SingleSelectDropdown from '../SingleSelectDropdown/SingleSelectDropdown';
import './MovieCard.scss';

const Button = () => {
  return (
    <div className="movie-options-button">
      <div>...</div>
    </div>
  );
};

const MovieCard = ({ movie, handleCardAction, handleCardClick }) => {
  return (
    <div className="movie-card">
      <div className="movie-image" onClick={(e) => handleCardClick(movie)}>
        <MoviePoster imageUrl={movie.poster} />
      </div>
      <div className="movie-desc">
        <span className="title">{movie.title}</span>
        <span className="genre">{movie.genres ? movie.genres.join(' ') : ''}</span>
        <span className="year">{movie.releaseYear}</span>
      </div>
      <div className="button">
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
  movie: movie,
  handleCardAction: PropTypes.func,
  handleCardClick: PropTypes.func,
};

export default MovieCard;
