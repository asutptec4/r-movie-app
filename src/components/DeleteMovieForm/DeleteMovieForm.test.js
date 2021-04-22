import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import 'regenerator-runtime/runtime';

import DeleteMovieForm from './DeleteMovieForm';

describe('<DeleteMovieForm />', () => {
  const deleteTestMovie = {
    title: 'Transformers',
    poster: 'https://image.service.org/ln6d5Okr6VK5vfQVobJTiYxeD0l.jpg',
    releaseDate: '2021-04-07',
    genres: ['Action'],
    overview: 'Some text for overview',
    runtime: 120,
    id: 123456,
  };

  test('should render and submit delete movie form', async () => {
    const handleSubmit = jest.fn();
    const { getByRole, getByText } = render(<DeleteMovieForm movie={deleteTestMovie} handleSubmit={handleSubmit} />);
    expect(getByText(/delete movie/i)).toBeInTheDocument();
    expect(getByText(`Are you sure you want to delete this movie ${deleteTestMovie.title}?`)).toBeInTheDocument();
    userEvent.click(getByRole('button', { name: /confirm/i }));
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith(deleteTestMovie));
  });
});
