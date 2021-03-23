import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Icon from '../../assets/image-not-found.png';
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

const MovieCard = ({ movie, handleCardAction, handleCardClick }) => {
  const [image, setImage] = useState(movie.poster);

  return (
    <div className="movie-card">
      <img
        src={image}
        alt="Movie poster"
        className="movie-image"
        onClick={(e) => handleCardClick(movie)}
        onError={(e) => {
          setImage(Icon);
        }}
      ></img>
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
