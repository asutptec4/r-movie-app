import PropTypes from 'prop-types';
import React from 'react';

import { movie } from '../../types/movie';
import './DeleteMovieForm.scss';

const handleDelete = (e, movie) => {
  e.preventDefault();
};

const DeleteMovieForm = ({ movie, handleEditorClose }) => {
  return (
    <form className="delete-movie-form">
      <div className="title">Delete Movie</div>
      <div>Are you sure you want to delete this movie {movie?.title}?</div>
      <input className="confirm" type="submit" value="Confirm" onClick={(e) => handleDelete(e, movie)} />
    </form>
  );
};

DeleteMovieForm.propTypes = {
  movie: movie,
  handleEditorClose: PropTypes.func,
};

export default DeleteMovieForm;
