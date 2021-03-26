import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { MovieApi } from '../api/api';
import { REQUEST_PENDING, REQUEST_IDLE, REQUEST_COMPLETED, REQUEST_ERROR, DIALOG_SLICE_NAME } from '../constant';

const initialState = {
  movie: null,
  action: null,
  isOpen: false,
  requestStatus: REQUEST_IDLE,
};

export const addMovie = createAsyncThunk(`${DIALOG_SLICE_NAME}/addMovie`, (movie) => {
  return MovieApi.create(movie);
});

export const editMovie = createAsyncThunk(`${DIALOG_SLICE_NAME}/editMovie`, (movie) => {
  return MovieApi.update(movie);
});

export const deleteMovie = createAsyncThunk(`${DIALOG_SLICE_NAME}/deleteMovie`, (movie) => {
  return MovieApi.delete(movie.id);
});

const pendingReducer = (state) => {
  if (state.requestStatus === REQUEST_IDLE) {
    state.requestStatus = REQUEST_PENDING;
  }
};

const fulfilledReducer = (state) => {
  if (state.requestStatus === REQUEST_PENDING) {
    state.requestStatus = REQUEST_COMPLETED;
  }
};

const rejectedReducer = (state) => {
  if (state.requestStatus === REQUEST_PENDING) {
    state.requestStatus = REQUEST_ERROR;
  }
};

const dialogSlice = createSlice({
  name: DIALOG_SLICE_NAME,
  initialState,
  reducers: {
    openDialog(state, action) {
      state.action = action.payload.action;
      state.movie = action.payload.movie;
      state.isOpen = true;
      state.requestStatus = REQUEST_IDLE;
    },
    closeDialog(state) {
      state.action = null;
      state.movie = null;
      state.isOpen = false;
      state.requestStatus = REQUEST_IDLE;
    },
  },
  extraReducers: {
    [addMovie.pending]: pendingReducer,
    [addMovie.fulfilled]: fulfilledReducer,
    [addMovie.rejected]: rejectedReducer,
    [editMovie.pending]: pendingReducer,
    [editMovie.fulfilled]: fulfilledReducer,
    [editMovie.rejected]: rejectedReducer,
    [deleteMovie.pending]: pendingReducer,
    [deleteMovie.fulfilled]: fulfilledReducer,
    [deleteMovie.rejected]: rejectedReducer,
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;

export default dialogSlice.reducer;

export const selectDialogMovie = (state) => state.dialog.movie;
export const selectDialogAction = (state) => state.dialog.action;
export const selectDialogIsOpen = (state) => state.dialog.isOpen;
export const selectDialogRequestStatus = (state) => state.dialog.requestStatus;
