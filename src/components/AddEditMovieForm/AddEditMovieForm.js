import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';

import { availableGenres } from '../../movie-config';
import { movie } from '../../types/movie';
import { defaultHandler } from '../../utils/util-func';
import MultiSelectInput from '../MultiSelectInput/MultiSelectInput';
import TextInput from '../TextInput/TextInput';
import validationSchema from './AddEditMovieFormValidationSchema';
import styles from './AddEditMovieForm.module.scss';

const AddEditMovieForm = ({ movie, handleSubmit }) => {
  return (
    <Formik
      initialValues={{
        id: movie.id,
        title: movie.title || '',
        releaseDate: movie.releaseDate || '',
        poster: movie.poster || '',
        genres: movie.genres || [],
        overview: movie.overview || '',
        runtime: movie.runtime || '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.addEditMovieForm}>
          <div className={styles.title}>{movie.id ? 'Edit' : 'Add'} movie</div>
          {movie.id && (
            <>
              <div className="app-form-label">Movie ID:</div>
              <div>{movie.id}</div>
            </>
          )}
          <TextInput label="Title:" name="title" placeholder="Title here" type="text" />
          <TextInput label="Release Date:" name="releaseDate" placeholder="Select date" type="date" />
          <TextInput label="Movie URL:" name="poster" placeholder="Movie URL here" type="text" />
          <MultiSelectInput
            label="Genre:"
            availableOptions={availableGenres}
            placeholder="Select Genre"
            name="genres"
          />
          <TextInput label="Overview:" name="overview" placeholder="Overview here" type="text" />
          <TextInput label="Runtime:" name="runtime" placeholder="Runtime here" type="text" />
          <div className={styles.buttonContainer}>
            <button className={styles.reset} type="reset">
              Reset
            </button>
            <button className={styles.save} disabled={isSubmitting} type="submit">
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
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
