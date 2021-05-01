import React from 'react';
import { useDispatch } from 'react-redux';

import { ADD_ACTION } from '../../constant';
import { openDialog } from '../../reducers/dialogSlice';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import GlobalSearch from './GlobalSearch';
import MovieListContainer from './MovieListContainer';

const PageWithSearch = () => {
  const dispatch = useDispatch();

  return (
    <>
      <header className="header">
        <div className="logo app-logo">NetflixRoulette</div>
        <div className="control-area">
          <div className="user-controls">
            <button className="control-button" onClick={() => dispatch(openDialog({ action: ADD_ACTION, movie: {} }))}>
              + Add Movie
            </button>
          </div>
        </div>
        <GlobalSearch />
      </header>
      <main>
        <div className="content">
          <ErrorBoundary>
            <MovieListContainer />
            <div></div>
          </ErrorBoundary>
        </div>
      </main>
    </>
  );
};

export default PageWithSearch;
