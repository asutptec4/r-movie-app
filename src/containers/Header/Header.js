import React, { useState } from 'react';

import GlobalSearch from '../../components/GlobalSearch/GlobalSearch';
import MovieDescription from '../../components/MovieDescription/MovieDescription';
import './Header.scss';

const Header = () => {
  const [showMovieDesc, setShowMovieDesc] = useState(false);

  const closeDescription = () => {
    setShowMovieDesc(false);
  };

  const openDescription = () => {
    setShowMovieDesc(true);
  };

  return (
    <header className={'header ' + (showMovieDesc ? 'large' : '')}>
      {showMovieDesc ? (
        <MovieDescription closeButtonHandler={closeDescription}></MovieDescription>
      ) : (
        <>
          <div className="control-area">
            <span className="logo app-logo">NetflixRoulette</span>
            <div className="user-controls">
              <button className="control-button" onClick={openDescription}>
                + Add Movie
              </button>
              <button className="control-button">Login</button>
            </div>
          </div>
          <GlobalSearch />
        </>
      )}
    </header>
  );
};

export default Header;
