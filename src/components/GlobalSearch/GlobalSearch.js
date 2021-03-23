import { func } from 'prop-types';
import React, { useRef } from 'react';

import './GlobalSearch.scss';

const GlobalSearch = ({ handleSearch }) => {
  const searchInput = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchInput.current.value);
    }
  };

  return (
    <div className="global-search">
      <span className="title">Find your movie</span>
      <input
        className="input"
        placeholder="What do you want to search?"
        ref={searchInput}
        onKeyDown={handleKeyDown}
      ></input>
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
