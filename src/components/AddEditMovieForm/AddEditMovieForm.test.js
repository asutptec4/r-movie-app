import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useField } from 'formik';
import React from 'react';
import 'regenerator-runtime/runtime';

import AddEditMovieForm from './AddEditMovieForm';

const MultiSelectInputMock = ({ ...props }) => {
  const [, , helper] = useField(props);
  const setTestValue = () => {
    helper.setValue(['Action']);
  };
  return (
    <button type="button" onClick={setTestValue}>
      Select Genres
    </button>
  );
};
jest.mock('../MultiSelectInput/MultiSelectInput', () => MultiSelectInputMock);

describe('<AddEditMovieForm />', () => {
  const addTestMovie = {
    title: 'Transformers',
    poster: 'https://image.service.org/ln6d5Okr6VK5vfQVobJTiYxeD0l.jpg',
    releaseDate: '2021-04-07',
    genres: ['Action'],
    overview: 'Some text for overview',
    runtime: '120',
    id: undefined,
  };
  const editTestMovie = { ...addTestMovie, id: 123456, runtime: 120 };

  test('should render and submit add movie form', async () => {
    const handleSubmit = jest.fn();
    render(<AddEditMovieForm movie={{}} handleSubmit={handleSubmit} />);
    expect(screen.getByText(/add movie/i)).toBeInTheDocument();
    userEvent.type(screen.getByLabelText(/title/i), addTestMovie.title);
    userEvent.type(screen.getByLabelText(/release date/i), addTestMovie.releaseDate);
    userEvent.type(screen.getByLabelText(/movie url/i), addTestMovie.poster);
    userEvent.type(screen.getByLabelText(/overview/i), addTestMovie.overview);
    userEvent.type(screen.getByLabelText(/runtime/i), addTestMovie.runtime);
    userEvent.click(screen.getByRole('button', { name: /select genres/i }));
    userEvent.click(screen.getByRole('button', { name: /save/i }));
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith(addTestMovie));
  });

  test('should render and submit edit movie form', async () => {
    const handleSubmit = jest.fn();
    render(<AddEditMovieForm movie={editTestMovie} handleSubmit={handleSubmit} />);
    expect(screen.getByText(/edit movie/i)).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /save/i }));
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith(editTestMovie));
  });
});
