import PropTypes from 'prop-types';
import React from 'react';

import './DeleteMovieForm.scss';

const handleDelete = (id, e) => {
  e.preventDefault();
  console.log('delete ' + id);
};

const DeleteMovieForm = (props) => {
  return (
    <form className="delete-movie-form">
      <div className="title">Delete Movie</div>
      <div>Are you sure you want to delete this movie?</div>
      <input className="confirm" type="submit" value="Confirm" onClick={(e) => handleDelete(props.movieId, e)} />
    </form>
  );
};

DeleteMovieForm.propTypes = {
  movieId: PropTypes.string,
};

export default DeleteMovieForm;
