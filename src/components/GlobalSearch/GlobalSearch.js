import { func } from 'prop-types';
import React, { useRef } from 'react';

import './GlobalSearch.scss';

const GlobalSearch = ({ handleSearch }) => {
  const searchInput = useRef(null);

  return (
    <div className="global-search">
      <span className="title">Find your movie</span>
      <input className="input" placeholder="What do you want to search?" ref={searchInput}></input>
      <button
        className="button"
        onClick={() => {
          handleSearch(searchInput.current.value);
        }}
      >
        Search
      </button>
    </div>
  );
};

GlobalSearch.propTypes = {
  handleSearch: func,
};

export default GlobalSearch;
