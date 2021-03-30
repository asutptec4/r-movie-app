import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import * as Yup from 'yup';

import { availableGenres } from '../../movie-config';
import { movie } from '../../types/movie';
import { defaultHandler } from '../../utils/util-func';
import MultiSelectInput from '../MultiSelectInput/MultiSelectInput';
import TextInput from '../TextInput/TextInput';
import './AddEditMovieForm.scss';

const AddEditMovieForm = ({ movie, handleSubmit }) => {
  return (
    <Formik
      initialValues={{
        id: movie.id,
        title: movie.title,
        releaseDate: movie.releaseDate,
        poster: movie.poster,
        genres: movie.genres || [],
        overview: movie.overview,
        runtime: movie.runtime,
      }}
      validationSchema={Yup.object({
        title: Yup.string().required('This is a required field.'),
        poster: Yup.string().url('Must be a valid url.').required('This is a required field.'),
        releaseDate: Yup.date(),
        genres: Yup.array().of(Yup.string()).min(1, 'Select at least one genre.').required(),
        overview: Yup.string().required('This is a required field.'),
        runtime: Yup.number()
          .typeError('Must be a number.')
          .min(0, 'Must be more than 0.')
          .required('This is a required field.'),
      })}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      <Form className="add-edit-movie-form">
        <div className="title">{movie.id ? 'Edit' : 'Add'} movie</div>
        {movie.id && (
          <>
            <div className="app-form-label">Movie ID:</div>
            <div>{movie.id}</div>
          </>
        )}
        <TextInput label="Title:" name="title" placeholder="Title here" type="text" />
        <TextInput label="Release Date:" name="releaseDate" placeholder="Select date" type="date" />
        <TextInput label="Movie URL:" name="poster" placeholder="Movie URL here" type="text" />
        <MultiSelectInput label="Genre:" availableOptions={availableGenres} placeholder="Select Genre" name="genres" />
        <TextInput label="Overview:" name="overview" placeholder="Overview here" type="text" />
        <TextInput label="Runtime:" name="runtime" placeholder="Runtime here" type="text" />
        <div className="button-container">
          <button className="reset" type="reset">
            Reset
          </button>
          <button className="save" type="submit">
            Save
          </button>
        </div>
      </Form>
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
