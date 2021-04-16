import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { MOVIES_PATH, NOT_FOUND_PATH } from '../../constant';
import WithLoading from '../../hoc/WithLoading';
import {
  fetchMovie,
  resetIsNotFound,
  resetMovie,
  selectDetailMovie,
  selectLoading,
  selectNotFound,
} from '../../reducers/detailsSlice';
import MovieDescription from './MovieDescription';

const MovieDescriptionWithLoading = WithLoading(MovieDescription);

const MovieDescriptionWithRouteLoading = () => {
  const { movieId } = useParams();
  const history = useHistory();

  const detailMovie = useSelector(selectDetailMovie);
  const isLoading = useSelector(selectLoading);
  const isNotFound = useSelector(selectNotFound);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    history.push(MOVIES_PATH);
    dispatch(resetMovie());
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchMovie(movieId));
  }, [movieId]);

  useEffect(() => {
    if (isNotFound) {
      dispatch(resetIsNotFound());
      history.replace(NOT_FOUND_PATH);
    }
  }, [isNotFound]);

  return (
    <MovieDescriptionWithLoading
      movie={detailMovie}
      closeButtonHandler={handleClose}
      isLoading={isLoading}
    ></MovieDescriptionWithLoading>
  );
};

export default MovieDescriptionWithRouteLoading;
