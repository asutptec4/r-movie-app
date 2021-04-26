import PropTypes from 'prop-types';
import React from 'react';

import { movie } from '../../types/movie';
import { defaultHandler } from '../../utils/util-func';
import styles from './DeleteMovieForm.module.scss';

const DeleteMovieForm = ({ movie, handleSubmit }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    handleSubmit(movie);
  };

  return (
    <form className={styles.deleteMovieForm}>
      <div className={styles.title}>Delete Movie</div>
      <div>Are you sure you want to delete this movie {movie?.title}?</div>
      <input className={styles.confirm} type="submit" value="Confirm" onClick={handleDelete} />
    </form>
  );
};

DeleteMovieForm.defaultProps = {
  handleSubmit: defaultHandler,
};

DeleteMovieForm.propTypes = {
  movie: movie,
  handleSubmit: PropTypes.func,
};

export default DeleteMovieForm;
