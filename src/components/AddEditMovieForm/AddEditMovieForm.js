import PropTypes from 'prop-types';
import React from 'react';

import { movie } from '../../types/movie';
import { defaultHandler } from '../../utils/util-func';
import './AddEditMovieForm.scss';

const AddEditMovieForm = ({ movie, handleSubmit }) => {
  const handleSave = (e) => {
    e.preventDefault();
    handleSubmit(movie);
  };

  return (
    <form className="add-edit-movie-form">
      <div className="title">{movie.id ? 'Edit' : 'Add'} movie</div>
      {movie.id && (
        <>
          <label htmlFor="id">Movie ID:</label>
          <div>{movie.id}</div>
        </>
      )}
      <label htmlFor="title">Title:</label>
      <input type="text" name="title" id="title" placeholder="Title here" value={movie.title} />
      <label htmlFor="releaseDate">Release Date:</label>
      <input type="date" name="releaseDate" id="releaseDate" placeholder="Select date" />
      <label htmlFor="url">Movie URL:</label>
      <input type="url" name="url" id="url" placeholder="Movie URL here" />
      <label htmlFor="genre">Genre:</label>
      <input type="text" name="genre" id="genre" placeholder="Select genres" />
      <label htmlFor="overview">Overview:</label>
      <input type="text" name="overview" id="overview" placeholder="Overview here" />
      <label htmlFor="runtime">Runtime:</label>
      <input type="text" name="runtime" id="runtime" placeholder="Runtime here" />
      <div className="button-container">
        <input className="reset" type="reset" value="Reset" />
        <input className="save" type="submit" value="Save" onClick={handleSave} />
      </div>
    </form>
  );
};

AddEditMovieForm.defaultProps = {
  handleSubmit: defaultHandler,
};

AddEditMovieForm.propTypes = {
  movie: movie,
  handleSubmit: PropTypes.func,
};

export default AddEditMovieForm;
