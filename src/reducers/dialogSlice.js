import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movie: null,
  action: null,
  isOpen: false,
};

const counterSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog(state, action) {
      state.action = action.payload.action;
      state.movie = action.payload.movie;
      state.isOpen = true;
    },
    closeDialog(state) {
      state.isOpen = false;
    },
  },
});

export const { openDialog, closeDialog } = counterSlice.actions;

export default counterSlice.reducer;

export const selectDialogMovie = (state) => state.dialog.movie;
export const selectDialogAction = (state) => state.dialog.action;
export const selectDialogIsOpen = (state) => state.dialog.isOpen;
