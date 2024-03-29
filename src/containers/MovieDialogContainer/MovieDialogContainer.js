import React, { Suspense, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Dialog from '../../components/Dialog/Dialog';
import { ADD_ACTION, DELETE_ACTION, EDIT_ACTION, REQUEST_COMPLETED } from '../../constant';
import {
  addMovie,
  closeDialog,
  deleteMovie,
  editMovie,
  selectDialogAction,
  selectDialogIsOpen,
  selectDialogMovie,
  selectDialogRequestStatus,
} from '../../reducers/dialogSlice';
import { fetchMovies } from '../../reducers/moviesSlice';
import { useComponentDidUpdate } from '../../utils/custom-hooks';

const MovieDialogContainer = () => {
  const action = useSelector(selectDialogAction);
  const dialogMovie = useSelector(selectDialogMovie);
  const isOpen = useSelector(selectDialogIsOpen);
  const actionStatus = useSelector(selectDialogRequestStatus);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(closeDialog());
  });

  const handleSubmit = useCallback((movie) => {
    if (action === DELETE_ACTION) {
      dispatch(deleteMovie(movie));
    } else if (action === ADD_ACTION) {
      dispatch(addMovie(movie));
    } else if (action === EDIT_ACTION) {
      dispatch(editMovie(movie));
    }
  });

  useComponentDidUpdate(() => {
    if (actionStatus === REQUEST_COMPLETED) {
      dispatch(fetchMovies());
      handleClose();
    }
  }, [actionStatus]);

  const Form =
    action === DELETE_ACTION
      ? React.lazy(() => import('../../components/DeleteMovieForm/DeleteMovieForm'))
      : React.lazy(() => import('../../components/AddEditMovieForm/AddEditMovieForm'));

  return (
    <>
      {isOpen && (
        <Dialog handleClose={handleClose}>
          <Suspense fallback={<div>Loading...</div>}>
            <Form movie={dialogMovie} handleSubmit={handleSubmit} />
          </Suspense>
        </Dialog>
      )}
    </>
  );
};

export default MovieDialogContainer;
