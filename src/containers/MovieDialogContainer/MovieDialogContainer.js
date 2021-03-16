import React from 'react';

import AddEditMovieForm from '../../components/AddEditMovieForm/AddEditMovieForm';
import DeleteMovieForm from '../../components/DeleteMovieForm/DeleteMovieForm';
import Dialog from '../../components/Dialog/Dialog';
import { movie, movieAction } from '../../types';
import { useComponentDidUpdate, useSetReset } from '../../utils/custom-hooks';

const MovieDialogContainer = ({ action, movie }) => {
  const [isOpened, open, close] = useSetReset(!!action);

  useComponentDidUpdate(() => {
    if (action) {
      open();
    }
  }, [action, movie]);

  const Form = action?.id === 'delete' ? DeleteMovieForm : AddEditMovieForm;

  return (
    <>
      {isOpened && (
        <Dialog handleClose={close}>
          <Form movie={movie} handleEditorClose={close} />
        </Dialog>
      )}
    </>
  );
};

MovieDialogContainer.propTypes = {
  action: movieAction,
  movie: movie,
};

export default MovieDialogContainer;
