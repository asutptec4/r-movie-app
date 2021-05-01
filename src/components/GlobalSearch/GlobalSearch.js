import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { SEARCH_PATH } from '../../constant';
import { fetchMovies, selectSearchText, setSearchText } from '../../reducers/moviesSlice';
import { useOnRouteMatch } from '../../utils/custom-hooks';
import styles from './GlobalSearch.module.scss';

const GlobalSearch = () => {
  const searchInput = useRef(null);

  const dispatch = useDispatch();
  const searchText = useSelector(selectSearchText);

  const history = useHistory();

  const makeSearch = (searchStr) => {
    dispatch(setSearchText(searchStr));
    dispatch(fetchMovies());
  };

  const handleSearch = () => {
    const searchStr = searchInput.current.value;
    history.push(`${SEARCH_PATH}/${searchStr}`);
    if (searchStr === '') {
      makeSearch(searchStr);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useOnRouteMatch({ path: `${SEARCH_PATH}/:query`, strict: true }, (match) => {
    if (match) {
      makeSearch(match.params?.query);
    }
  });

  useEffect(() => {
    searchInput.current.value = searchText;
  }, [searchText]);

  return (
    <div className={styles.globalSearch}>
      <label className={styles.title} htmlFor="searchInput">
        Find your movie
      </label>
      <input
        id="searchInput"
        className={styles.input}
        placeholder="What do you want to search?"
        ref={searchInput}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.button} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default GlobalSearch;
