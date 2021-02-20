import React from 'react';

import GlobalSearch from '../../components/GlobalSearch/GlobalSearch';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="control-area">
        <span className="logo c-logo">NetflixRoulette</span>
        <div className="user-controls">
          <button className="control-button">+ Add Movie</button>
          <button className="control-button">Login</button>
        </div>
      </div>
      <GlobalSearch />
    </header>
  );
};

export default Header;
