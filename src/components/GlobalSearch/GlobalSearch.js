import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { fetchMovies, setSearchText } from '../../reducers/moviesSlice';
import './GlobalSearch.scss';

const GlobalSearch = () => {
  const searchInput = useRef(null);

  const dispatch = useDispatch();

  const history = useHistory();
  const match = useRouteMatch({ path: '/search/:query', strict: true });

  useEffect(() => {
    if (match) {
      const searchText = match.params?.query;
      searchInput.current.value = searchText;
      dispatch(setSearchText(searchText));
      dispatch(fetchMovies());
    }
  }, [match]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const searchText = searchInput.current.value;
    history.push(`/search/${searchText}`);
    if (searchText === '') {
      dispatch(setSearchText(searchText));
      dispatch(fetchMovies());
    }
  };

  return (
    <div className="global-search">
      <span className="title">Find your movie</span>
      <input className="input" placeholder="What do you want to search?" ref={searchInput} onKeyDown={handleKeyDown} />
      <button className="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default GlobalSearch;
