import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import 'regenerator-runtime/runtime';

import GlobalSearch from './GlobalSearch';

const mockStore = configureMockStore([thunk]);

describe('<GlobalSearch />', () => {
  test('should render search form and make search by route', async () => {
    const store = mockStore({
      movies: {
        searchText: '',
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/search/transformers']}>
          <GlobalSearch />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText('Find your movie')).toBeInTheDocument();
    await waitFor(() =>
      expect(store.getActions()).toContainEqual(
        expect.objectContaining({
          type: 'movies/setSearchText',
        }),
      ),
    );
  });

  test('should render search form by enter click', async () => {
    const store = mockStore({
      movies: {
        searchText: '',
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movies']}>
          <GlobalSearch />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText('Find your movie')).toBeInTheDocument();
    userEvent.type(screen.getByPlaceholderText(/search/i), 'test{enter}');
    await waitFor(() =>
      expect(store.getActions()).toContainEqual(
        expect.objectContaining({
          type: 'movies/setSearchText',
        }),
      ),
    );
  });
});
