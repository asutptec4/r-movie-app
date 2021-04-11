import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import detailsReducer from '../reducers/detailsSlice';
import dialogReducer from '../reducers/dialogSlice';
import moviesReducer from '../reducers/moviesSlice';

const reducer = {
  movies: moviesReducer,
  dialog: dialogReducer,
  details: detailsReducer,
};

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk).concat(createLogger()),
  devTools: process.env.NODE_ENV !== 'production',
});
