import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../../assets/card.jpg';
import { movie } from '../../types/movie';
import SingleSelectDropdown from '../SingleSelectDropdown/SingleSelectDropdown';
import './MovieCard.scss';

const editOptions = [
  { id: 'edit', name: 'Edit' },
  { id: 'delete', name: 'Delete' },
];

const Button = () => {
  return (
    <div className="movie-options-button">
      <div>...</div>
    </div>
  );
};

const MovieCard = ({ movie, handleCardAction }) => {
  return (
    <div className="movie-card">
      <img src={Icon} alt="Movie poster" className="movie-image"></img>
      <div className="movie-desc">
        <span className="title">{movie.title}</span>
        <span className="genre">{movie.genres ? movie.genres.join(' ') : ''}</span>
        <span className="year">{movie.releaseYear}</span>
      </div>
      <div className="button">
        <SingleSelectDropdown
          options={editOptions}
          customButton={<Button />}
          onOptionChange={(o) => handleCardAction(o, movie)}
        />
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: movie,
  handleCardAction: PropTypes.func.isRequired,
};

export default MovieCard;
