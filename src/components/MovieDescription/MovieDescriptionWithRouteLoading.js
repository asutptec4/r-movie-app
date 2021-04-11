import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import WithLoading from '../../hoc/WithLoading';
import { fetchMovie, resetMovie, selectDetailMovie, selectLoading } from '../../reducers/detailsSlice';
import MovieDescription from './MovieDescription';

const MovieDescriptionWithLoading = WithLoading(MovieDescription);

const MovieDescriptionWithRouteLoading = () => {
  const { movieId } = useParams();
  const history = useHistory();

  const detailMovie = useSelector(selectDetailMovie);
  const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    history.push('/movies');
    dispatch(resetMovie());
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchMovie(movieId));
  }, [movieId]);

  return (
    <MovieDescriptionWithLoading
      movie={detailMovie}
      closeButtonHandler={handleClose}
      isLoading={isLoading}
    ></MovieDescriptionWithLoading>
  );
};

export default MovieDescriptionWithRouteLoading;
