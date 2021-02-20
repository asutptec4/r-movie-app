import React from 'react';

import './GlobalSearch.scss';

const GlobalSearch = () => {
  return (
    <div className="global-search">
      <span className="title">Find your movie</span>
      <input className="input" placeholder="What do you want to search?"></input>
      <button className="button">Search</button>
    </div>
  );
};

export default GlobalSearch;
