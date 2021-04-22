import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import 'regenerator-runtime/runtime';

import { MovieApi } from '../api/api';
import { REQUEST_COMPLETED, REQUEST_ERROR, REQUEST_IDLE, REQUEST_PENDING } from '../constant';
import reducer, {
  addMovie,
  editMovie,
  deleteMovie,
  openDialog,
  closeDialog,
  selectDialogMovie,
  selectDialogAction,
  selectDialogIsOpen,
  selectDialogRequestStatus,
} from './dialogSlice';

jest.mock('../api/api');

const mockStore = configureMockStore([thunk]);

describe('dialogSlice', () => {
  test('should return the initial state on first run', () => {
    expect(reducer(undefined, {})).toEqual({
      movie: null,
      action: null,
      isOpen: false,
      requestStatus: REQUEST_IDLE,
    });
  });

  test('should handle openDialog action', () => {
    const nextState = reducer(
      {
        movie: null,
        action: null,
        isOpen: false,
        requestStatus: REQUEST_PENDING,
      },
      openDialog({ action: 'edit', movie: { id: 1, title: 'title' } }),
    );
    const rootState = { dialog: nextState };
    expect(selectDialogMovie(rootState)).toEqual({ id: 1, title: 'title' });
    expect(selectDialogAction(rootState)).toEqual('edit');
    expect(selectDialogIsOpen(rootState)).toBeTruthy();
    expect(selectDialogRequestStatus(rootState)).toEqual(REQUEST_IDLE);
  });

  test('should handle closeDialog action', () => {
    const nextState = reducer(
      {
        movie: { id: 1, title: 'title' },
        action: 'edit',
        isOpen: true,
        requestStatus: REQUEST_PENDING,
      },
      closeDialog(),
    );
    const rootState = { dialog: nextState };
    expect(selectDialogMovie(rootState)).toBeNull();
    expect(selectDialogAction(rootState)).toBeNull();
    expect(selectDialogIsOpen(rootState)).toBeFalsy();
    expect(selectDialogRequestStatus(rootState)).toEqual(REQUEST_IDLE);
  });

  test('should handle addMovie/pending action', () => {
    expect(
      selectDialogRequestStatus({
        dialog: reducer(
          {
            requestStatus: REQUEST_IDLE,
          },
          {
            type: 'dialog/addMovie/pending',
          },
        ),
      }),
    ).toEqual(REQUEST_PENDING);
    expect(
      selectDialogRequestStatus({
        dialog: reducer(
          {
            requestStatus: REQUEST_ERROR,
          },
          {
            type: 'dialog/addMovie/pending',
          },
        ),
      }),
    ).toEqual(REQUEST_ERROR);
  });

  test('should handle addMovie/fulfilled action', () => {
    expect(
      selectDialogRequestStatus({
        dialog: reducer(
          {
            requestStatus: REQUEST_PENDING,
          },
          {
            type: 'dialog/addMovie/fulfilled',
          },
        ),
      }),
    ).toEqual(REQUEST_COMPLETED);
    expect(
      selectDialogRequestStatus({
        dialog: reducer(
          {
            requestStatus: REQUEST_IDLE,
          },
          {
            type: 'dialog/addMovie/fulfilled',
          },
        ),
      }),
    ).toEqual(REQUEST_IDLE);
  });

  test('should handle addMovie/rejected action', () => {
    expect(
      selectDialogRequestStatus({
        dialog: reducer(
          {
            requestStatus: REQUEST_PENDING,
          },
          {
            type: 'dialog/addMovie/rejected',
          },
        ),
      }),
    ).toEqual(REQUEST_ERROR);
    expect(
      selectDialogRequestStatus({
        dialog: reducer(
          {
            requestStatus: REQUEST_IDLE,
          },
          {
            type: 'dialog/addMovie/rejected',
          },
        ),
      }),
    ).toEqual(REQUEST_IDLE);
  });

  test('addMovie should process pending and fulfilled actions', async () => {
    const store = mockStore({
      movie: null,
      action: null,
      isOpen: false,
      requestStatus: REQUEST_IDLE,
    });
    const movie = { id: 1, title: 'title' };
    MovieApi.create.mockResolvedValueOnce({ data: movie, status: 200, statusText: 'OK' });
    await store.dispatch(addMovie(movie));
    const actions = store.getActions();
    expect(actions[0]).toEqual(
      expect.objectContaining({
        type: 'dialog/addMovie/pending',
      }),
    );
    expect(actions[1]).toEqual(
      expect.objectContaining({
        type: 'dialog/addMovie/fulfilled',
      }),
    );
  });

  test('editMovie should process pending and fulfilled actions', async () => {
    const store = mockStore({
      movie: null,
      action: null,
      isOpen: false,
      requestStatus: REQUEST_IDLE,
    });
    const movie = { id: 1, title: 'title' };
    MovieApi.update.mockResolvedValueOnce({ data: movie, status: 200, statusText: 'OK' });
    await store.dispatch(editMovie(movie));
    const actions = store.getActions();
    expect(actions[0]).toEqual(
      expect.objectContaining({
        type: 'dialog/editMovie/pending',
      }),
    );
    expect(actions[1]).toEqual(
      expect.objectContaining({
        type: 'dialog/editMovie/fulfilled',
      }),
    );
  });

  test('deleteMovie should process pending and fulfilled actions', async () => {
    const store = mockStore({
      movie: null,
      action: null,
      isOpen: false,
      requestStatus: REQUEST_IDLE,
    });
    const movie = { id: 1, title: 'title' };
    MovieApi.delete.mockResolvedValueOnce({ status: 200, statusText: 'OK' });
    await store.dispatch(deleteMovie(movie));
    const actions = store.getActions();
    expect(actions[0]).toEqual(
      expect.objectContaining({
        type: 'dialog/deleteMovie/pending',
      }),
    );
    expect(actions[1]).toEqual(
      expect.objectContaining({
        type: 'dialog/deleteMovie/fulfilled',
      }),
    );
  });
});
