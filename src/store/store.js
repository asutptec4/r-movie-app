import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import dialogSlice from '../reducers/dialogSlice';
import movieReducer from '../reducers/moviesSlice';

const reducer = {
  movies: movieReducer,
  dialog: dialogSlice,
};

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk).concat(createLogger()),
  devTools: process.env.NODE_ENV !== 'production',
});
