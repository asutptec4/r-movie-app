import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import store from '../../store/store';
import GlobalSearch from './GlobalSearch';

describe('<GlobalSearch />', () => {
  test('should render search form', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/search/transformers']}>
          <GlobalSearch />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText('Find your movie')).toBeInTheDocument();
  });
});
