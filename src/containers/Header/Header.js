import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GlobalSearch from '../../components/GlobalSearch/GlobalSearch';
import MovieDescription from '../../components/MovieDescription/MovieDescription';
import { ADD_ACTION } from '../../constant';
import { openDialog } from '../../reducers/dialogSlice';
import {
  selectDetailMovie,
  selectShowDetail,
  hideDetail,
  setSearchText,
  fetchMovies,
} from '../../reducers/moviesSlice';
import { useComponentDidUpdate } from '../../utils/custom-hooks';
import './Header.scss';

const Header = () => {
  const isShowDetail = useSelector(selectShowDetail);
  const detailMovie = useSelector(selectDetailMovie);
  const dispatch = useDispatch();

  const handleSearch = (searchText) => {
    dispatch(setSearchText(searchText));
    dispatch(fetchMovies());
  };

  useComponentDidUpdate(() => {
    if (isShowDetail) {
      window.scrollTo(0, 0);
    }
  }, [detailMovie]);

  return (
    <header className={'header ' + (isShowDetail ? 'large' : '')}>
      {isShowDetail ? (
        <MovieDescription movie={detailMovie} closeButtonHandler={() => dispatch(hideDetail())}></MovieDescription>
      ) : (
        <>
          <div className="control-area">
            <span className="logo app-logo">NetflixRoulette</span>
            <div className="user-controls">
              <button
                className="control-button"
                onClick={() => dispatch(openDialog({ action: ADD_ACTION, movie: {} }))}
              >
                + Add Movie
              </button>
            </div>
          </div>
          <GlobalSearch handleSearch={handleSearch} />
        </>
      )}
    </header>
  );
};

export default Header;
