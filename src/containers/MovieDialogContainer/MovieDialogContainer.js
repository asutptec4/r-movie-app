import React, { useEffect, useState } from 'react';

import AddEditMovieForm from '../../components/AddEditMovieForm/AddEditMovieForm';
import DeleteMovieForm from '../../components/DeleteMovieForm/DeleteMovieForm';
import Dialog from '../../components/Dialog/Dialog';
import { movie, movieAction } from '../../types';

const MovieDialogContainer = ({ action, movie }) => {
  const [showModal, setShowModal] = useState(!!action);

  useEffect(() => {
    if (action) {
      setShowModal(true);
    }
  }, [action, movie]);

  const handleClose = () => {
    setShowModal(false);
  };

  let form;
  if (action?.id === 'delete') {
    form = <DeleteMovieForm movie={movie} handleEditorClose={handleClose} />;
  } else {
    form = <AddEditMovieForm movie={movie} handleEditorClose={handleClose} />;
  }

  return <>{showModal && <Dialog handleClose={handleClose}>{form}</Dialog>}</>;
};

MovieDialogContainer.propTypes = {
  action: movieAction,
  movie: movie,
};

export default MovieDialogContainer;
