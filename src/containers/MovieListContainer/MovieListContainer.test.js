import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import store from '../../store/store';
import MovieListContainer from './MovieListContainer';

describe('<MovieListContainer />', () => {
  test('should show no movie found at init', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movies']}>
          <MovieListContainer />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText(/no movie found/i)).toBeInTheDocument();
  });
});
