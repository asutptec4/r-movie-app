import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import 'regenerator-runtime/runtime';

import { REQUEST_ERROR, REQUEST_IDLE } from '../../constant';
import MovieDialogContainer from './MovieDialogContainer';

const mockStore = configureMockStore([thunk]);

describe('<MovieDialogContainer />', () => {
  test('should show add form amd make addMovie', async () => {
    const store = mockStore({
      dialog: {
        movie: {
          title: 'Transformers',
          poster: 'https://image.service.org/ln6d5Okr6VK5vfQVobJTiYxeD0l.jpg',
          releaseDate: '2021-04-07',
          genres: ['Action'],
          overview: 'Some text for overview',
          runtime: '120',
          id: undefined,
        },
        action: 'add',
        isOpen: true,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movies']}>
          <MovieDialogContainer />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText(/add movie/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    await waitFor(() =>
      expect(store.getActions()).toContainEqual(
        expect.objectContaining({
          type: 'dialog/addMovie/pending',
        }),
      ),
    );
  });

  test('should show delete form and make deleteMovie', () => {
    const store = mockStore({
      dialog: {
        movie: { id: undefined, title: 'title1' },
        action: 'delete',
        isOpen: true,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movies']}>
          <MovieDialogContainer />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText(/delete movie/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /confirm/i }));
    expect(store.getActions()).toContainEqual(
      expect.objectContaining({
        type: 'dialog/deleteMovie/pending',
      }),
    );
  });

  test('should show edit form and make editMovie', async () => {
    const store = mockStore({
      dialog: {
        movie: {
          title: 'Transformers',
          poster: 'https://image.service.org/ln6d5Okr6VK5vfQVobJTiYxeD0l.jpg',
          releaseDate: '2021-04-07',
          genres: ['Action'],
          overview: 'Some text for overview',
          runtime: '120',
          id: 1,
        },
        action: 'edit',
        isOpen: true,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movies']}>
          <MovieDialogContainer />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText(/edit movie/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    await waitFor(() =>
      expect(store.getActions()).toContainEqual(
        expect.objectContaining({
          type: 'dialog/editMovie/pending',
        }),
      ),
    );
  });

  test('should close form and make closeDialog', () => {
    const store = mockStore({
      dialog: {
        movie: { id: undefined, title: 'title1' },
        action: 'delete',
        isOpen: true,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movies']}>
          <MovieDialogContainer />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText(/delete movie/i)).toBeInTheDocument();
    fireEvent.click(screen.queryAllByRole('button', { class: /close/i })[0]);
    expect(store.getActions()).toContainEqual(
      expect.objectContaining({
        type: 'dialog/closeDialog',
      }),
    );
  });

  test('should close form oin request complete', () => {
    let store = mockStore({
      dialog: {
        movie: { id: undefined, title: 'title1' },
        action: 'delete',
        isOpen: true,
        requestStatus: REQUEST_IDLE,
      },
    });
    const { rerender } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movies']}>
          <MovieDialogContainer />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText(/delete movie/i)).toBeInTheDocument();
    store = mockStore({
      dialog: {
        movie: { id: undefined, title: 'title1' },
        action: 'delete',
        isOpen: true,
        requestStatus: REQUEST_ERROR,
      },
    });
    rerender(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movies']}>
          <MovieDialogContainer />
        </MemoryRouter>
      </Provider>,
    );
    expect(store.getActions()).not.toContainEqual(
      expect.objectContaining({
        type: 'dialog/closeDialog',
      }),
    );
  });
});
