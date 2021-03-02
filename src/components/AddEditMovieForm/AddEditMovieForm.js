import PropTypes from 'prop-types';
import React from 'react';

import './AddEditMovieForm.scss';

const handleSave = (e) => {
  e.preventDefault();
};

const AddEditMovieForm = (props) => {
  return (
    <form className="add-edit-movie-form">
      <div className="title">{props.isEditMode ? 'Edit' : 'Add'} movie</div>
      {props.isEditMode && (
        <>
          <label htmlFor="id">Movie ID:</label>
          <div>Movie Id</div>
        </>
      )}
      <label htmlFor="title">Title:</label>
      <input type="text" name="title" id="title" placeholder="Title here" />
      <label htmlFor="releaseDate">Release Date:</label>
      <input type="date" name="releaseDate" id="releaseDate" placeholder="Select date" />
      <label htmlFor="url">Movie URL:</label>
      <input type="url" name="url" id="url" placeholder="Movie URL here" />
      <label htmlFor="title">Genre:</label>
      <input type="text" name="genre" id="genre" placeholder="Select genres" />
      <label htmlFor="overview">Overview:</label>
      <input type="text" name="overview" id="overview" placeholder="Overview here" />
      <label htmlFor="runtime">Runtime:</label>
      <input type="text" name="runtime" id="runtimes" placeholder="Runtime here" />
      <div className="button-container">
        <input className="reset" type="reset" value="Reset" />
        <input className="save" type="submit" value="Save" onClick={(e) => handleSave(e)} />
      </div>
    </form>
  );
};

AddEditMovieForm.propTypes = {
  isEditMode: PropTypes.bool,
};

export default AddEditMovieForm;
