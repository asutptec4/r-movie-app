import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GlobalSearch from '../../components/GlobalSearch/GlobalSearch';
import MovieDescription from '../../components/MovieDescription/MovieDescription';
import { selectDetailMovie, selectShowDetail, hideDetail } from '../../reducers/moviesSlice';
import { useComponentDidUpdate } from '../../utils/custom-hooks';
import './Header.scss';

const Header = () => {
  const isShowDetail = useSelector(selectShowDetail);
  const detailMovie = useSelector(selectDetailMovie);
  const dispatch = useDispatch();

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
              <button className="control-button">+ Add Movie</button>
            </div>
          </div>
          <GlobalSearch />
        </>
      )}
    </header>
  );
};

export default Header;
