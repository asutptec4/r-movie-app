import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import store from '../../store/store';
import Header from './Header';

describe('<Header />', () => {
  test('should show search panel', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/search']}>
          <Header />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });
});
