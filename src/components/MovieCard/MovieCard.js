import PropTypes from 'prop-types';
import React from 'react';

import { DELETE_ACTION, EDIT_ACTION } from '../../constant';
import { movie } from '../../types/movie';
import MoviePoster from '../MoviePoster/MoviePoster';
import SingleSelectDropdown from '../SingleSelectDropdown/SingleSelectDropdown';
import './MovieCard.scss';

const editOptions = [
  { id: EDIT_ACTION, name: 'Edit' },
  { id: DELETE_ACTION, name: 'Delete' },
];

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
          options={editOptions}
          customButton={<Button />}
          onOptionChange={(o) => handleCardAction(o?.id, movie)}
        />
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: movie,
  handleCardAction: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired,
};

export default MovieCard;
