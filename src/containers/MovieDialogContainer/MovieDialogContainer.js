import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddEditMovieForm from '../../components/AddEditMovieForm/AddEditMovieForm';
import DeleteMovieForm from '../../components/DeleteMovieForm/DeleteMovieForm';
import Dialog from '../../components/Dialog/Dialog';
import { closeDialog, selectDialogAction, selectDialogIsOpen, selectDialogMovie } from '../../reducers/dialogSlice';

const MovieDialogContainer = () => {
  const action = useSelector(selectDialogAction);
  const movie = useSelector(selectDialogMovie);
  const isOpen = useSelector(selectDialogIsOpen);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(closeDialog());
  });

  const Form = action === 'delete' ? DeleteMovieForm : AddEditMovieForm;

  return (
    <>
      {isOpen && (
        <Dialog handleClose={handleClose}>
          <Form movie={movie} handleEditorClose={handleClose} />
        </Dialog>
      )}
    </>
  );
};

export default MovieDialogContainer;
