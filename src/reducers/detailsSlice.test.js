import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import 'regenerator-runtime/runtime';

import { MovieApi } from '../api/api';
import reducer, {
  fetchMovie,
  resetIsNotFound,
  resetMovie,
  selectDetailMovie,
  selectLoading,
  selectNotFound,
} from './detailsSlice';

jest.mock('../api/api');

const mockStore = configureMockStore([thunk]);

describe('detailsSlice', () => {
  test('should return the initial state on first run', () => {
    expect(reducer(undefined, {})).toEqual({
      detailMovie: null,
      isLoading: false,
      isNotFound: false,
    });
  });

  test('should handle resetMovie action', () => {
    const nextState = reducer(
      {
        detailMovie: { id: 1, title: 'title' },
        isLoading: true,
        isNotFound: true,
      },
      resetMovie(),
    );
    expect(selectDetailMovie({ details: nextState })).toBeNull();
  });

  test('should handle resetIsNotFound action', () => {
    const nextState = reducer(
      {
        detailMovie: { id: 1, title: 'title' },
        isLoading: true,
        isNotFound: true,
      },
      resetIsNotFound(),
    );
    expect(selectNotFound({ details: nextState })).toBeFalsy();
  });

  test('should handle fetchMovie/pending action', () => {
    const nextState = reducer(
      {
        detailMovie: null,
        isLoading: true,
        isNotFound: true,
      },
      {
        type: 'details/fetchMovie/pending',
        payload: undefined,
      },
    );
    expect(selectLoading({ details: nextState })).toBeTruthy();
  });

  test('should handle fetchMovie/fulfilled action', () => {
    const nextState = reducer(
      {
        detailMovie: null,
        isLoading: true,
        isNotFound: true,
      },
      {
        type: 'details/fetchMovie/fulfilled',
        payload: { data: { id: 1, title: 'title' } },
      },
    );
    const rootState = { details: nextState };
    expect(selectLoading(rootState)).toBeFalsy();
    expect(selectDetailMovie(rootState)).toEqual(
      expect.objectContaining({
        id: 1,
        title: 'title',
      }),
    );
  });

  test('should handle fetchMovie/rejected action', () => {
    const nextState = reducer(
      {
        detailMovie: null,
        isLoading: true,
        isNotFound: false,
      },
      {
        type: 'details/fetchMovie/rejected',
        payload: undefined,
      },
    );
    const rootState = { details: nextState };
    expect(selectLoading(rootState)).toBeFalsy();
    expect(selectNotFound(rootState)).toBeTruthy();
  });

  test('fetchMovie should process pending and fulfilled actions', async () => {
    const store = mockStore({
      detailMovie: null,
      isLoading: false,
      isNotFound: false,
    });
    const id = 1;
    MovieApi.getById.mockResolvedValueOnce({ data: { id: id, title: 'title' }, status: 200, statusText: 'OK' });
    await store.dispatch(fetchMovie(id));
    const actions = store.getActions();
    expect(actions[0]).toEqual(
      expect.objectContaining({
        type: 'details/fetchMovie/pending',
      }),
    );
    expect(actions[1]).toEqual(
      expect.objectContaining({
        type: 'details/fetchMovie/fulfilled',
      }),
    );
  });
});
