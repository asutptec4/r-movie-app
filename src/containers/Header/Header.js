import React from 'react';

import GlobalSearch from '../../components/GlobalSearch/GlobalSearch';
import MovieDescription from '../../components/MovieDescription/MovieDescription';
import { movie } from '../../types';
import { useComponentDidUpdate, useSetReset } from '../../utils/custom-hooks';
import './Header.scss';

const Header = ({ selectedMovie }) => {
  const [isShowDescription, show, hide] = useSetReset(false);

  useComponentDidUpdate(() => {
    if (selectedMovie) {
      show();
      window.scrollTo(0, 0);
    }
  }, [selectedMovie]);

  return (
    <header className={'header ' + (isShowDescription ? 'large' : '')}>
      {isShowDescription ? (
        <MovieDescription movie={selectedMovie} closeButtonHandler={hide}></MovieDescription>
      ) : (
        <>
          <div className="control-area">
            <span className="logo app-logo">NetflixRoulette</span>
            <div className="user-controls">
              <button className="control-button">+ Add Movie</button>
              <button className="control-button">Login</button>
            </div>
          </div>
          <GlobalSearch />
        </>
      )}
    </header>
  );
};

Header.propTypes = {
  selectedMovie: movie,
};

export default Header;
