import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import store from '../../store/store';
import MovieDescriptionWithRouteLoading from './MovieDescriptionWithRouteLoading';

describe('<MovieDescriptionWithRouteLoading />', () => {
  test('should show loading skeleton at init', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/search/transformers']}>
          <MovieDescriptionWithRouteLoading />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
